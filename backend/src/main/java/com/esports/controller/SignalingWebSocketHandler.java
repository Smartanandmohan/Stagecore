package com.esports.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class SignalingWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Map of Session ID -> WebSocketSession
    private static final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    // Map of Session ID -> Username
    private static final Map<String, String> sessionUsernames = new ConcurrentHashMap<>();

    // Map of Room ID -> List of Session IDs
    private static final Map<String, List<String>> roomSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        Map<String, Object> data;
        try {
            data = objectMapper.readValue(payload, Map.class);
        } catch (Exception e) {
            return;
        }

        String type = (String) data.get("type");
        if (type == null) return;

        switch (type) {
            case "join-room":
                handleJoinRoom(session, data);
                break;
            case "leave-room":
                handleLeaveRoom(session, data);
                break;
            case "signal":
                handleSignal(session, data);
                break;
            case "chat-message":
                handleChatMessage(session, data);
                break;
            case "room-control":
                handleRoomControl(session, data);
                break;
            default:
                break;
        }
    }

    private void handleJoinRoom(WebSocketSession session, Map<String, Object> data) throws IOException {
        String roomId = (String) data.get("room");
        String username = (String) data.get("username");
        if (roomId == null || username == null) return;

        sessionUsernames.put(session.getId(), username);

        // Add session to room
        roomSessions.computeIfAbsent(roomId, k -> new CopyOnWriteArrayList<>()).add(session.getId());

        // Notify other participants in the room
        List<String> roomMembers = roomSessions.get(roomId);
        Map<String, Object> joinNotification = new ConcurrentHashMap<>();
        joinNotification.put("type", "user-joined");
        joinNotification.put("sessionId", session.getId());
        joinNotification.put("username", username);

        String notificationPayload = objectMapper.writeValueAsString(joinNotification);
        TextMessage textMessage = new TextMessage(notificationPayload);

        for (String memberSessionId : roomMembers) {
            if (!memberSessionId.equals(session.getId())) {
                WebSocketSession memberSession = sessions.get(memberSessionId);
                if (memberSession != null && memberSession.isOpen()) {
                    memberSession.sendMessage(textMessage);
                }
            }
        }

        // Send list of current room members back to the new participant
        Map<String, Object> roomState = new ConcurrentHashMap<>();
        roomState.put("type", "room-state");
        
        List<Map<String, String>> membersList = new CopyOnWriteArrayList<>();
        for (String memberSessionId : roomMembers) {
            if (!memberSessionId.equals(session.getId())) {
                Map<String, String> member = new ConcurrentHashMap<>();
                member.put("sessionId", memberSessionId);
                member.put("username", sessionUsernames.getOrDefault(memberSessionId, "Unknown"));
                membersList.add(member);
            }
        }
        roomState.put("members", membersList);

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(roomState)));
    }

    private void handleLeaveRoom(WebSocketSession session, Map<String, Object> data) throws IOException {
        String roomId = (String) data.get("room");
        if (roomId == null) return;

        removeSessionFromRoom(session.getId(), roomId);
    }

    private void handleSignal(WebSocketSession session, Map<String, Object> data) throws IOException {
        String targetSessionId = (String) data.get("to");
        if (targetSessionId == null) return;

        // Enrich signaling message with sender credentials
        data.put("from", session.getId());
        data.put("sender", sessionUsernames.getOrDefault(session.getId(), "Unknown"));

        WebSocketSession targetSession = sessions.get(targetSessionId);
        if (targetSession != null && targetSession.isOpen()) {
            targetSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(data)));
        }
    }

    private void handleChatMessage(WebSocketSession session, Map<String, Object> data) throws IOException {
        String roomId = (String) data.get("room");
        if (roomId == null) return;

        data.put("sender", sessionUsernames.getOrDefault(session.getId(), "Unknown"));

        List<String> roomMembers = roomSessions.get(roomId);
        if (roomMembers == null) return;

        String msgPayload = objectMapper.writeValueAsString(data);
        TextMessage textMessage = new TextMessage(msgPayload);

        for (String memberSessionId : roomMembers) {
            if (!memberSessionId.equals(session.getId())) {
                WebSocketSession memberSession = sessions.get(memberSessionId);
                if (memberSession != null && memberSession.isOpen()) {
                    memberSession.sendMessage(textMessage);
                }
            }
        }
    }

    private void handleRoomControl(WebSocketSession session, Map<String, Object> data) throws IOException {
        String roomId = (String) data.get("room");
        String action = (String) data.get("action"); // "kick" or "mute"
        String targetUsername = (String) data.get("target");

        if (roomId == null || action == null || targetUsername == null) return;

        List<String> roomMembers = roomSessions.get(roomId);
        if (roomMembers == null) return;

        data.put("sender", sessionUsernames.getOrDefault(session.getId(), "Unknown"));
        String controlPayload = objectMapper.writeValueAsString(data);
        TextMessage textMessage = new TextMessage(controlPayload);

        for (String memberSessionId : roomMembers) {
            WebSocketSession memberSession = sessions.get(memberSessionId);
            if (memberSession != null && memberSession.isOpen()) {
                memberSession.sendMessage(textMessage);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String sessionId = session.getId();
        sessions.remove(sessionId);
        sessionUsernames.remove(sessionId);

        // Remove session from any rooms it was in
        for (String roomId : roomSessions.keySet()) {
            removeSessionFromRoom(sessionId, roomId);
        }
    }

    private void removeSessionFromRoom(String sessionId, String roomId) throws IOException {
        List<String> members = roomSessions.get(roomId);
        if (members != null && members.contains(sessionId)) {
            members.remove(sessionId);
            if (members.isEmpty()) {
                roomSessions.remove(roomId);
            } else {
                // Notify others in room
                Map<String, Object> leaveNotification = new ConcurrentHashMap<>();
                leaveNotification.put("type", "user-left");
                leaveNotification.put("sessionId", sessionId);

                String notificationPayload = objectMapper.writeValueAsString(leaveNotification);
                TextMessage textMessage = new TextMessage(notificationPayload);

                for (String memberSessionId : members) {
                    WebSocketSession memberSession = sessions.get(memberSessionId);
                    if (memberSession != null && memberSession.isOpen()) {
                        memberSession.sendMessage(textMessage);
                    }
                }
            }
        }
    }
}
