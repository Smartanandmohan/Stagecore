import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Users, Smile, Image, Paperclip, MoreHorizontal, Phone, Video, 
  Search, Hash, Pin, Settings, SquarePen, ChevronLeft, Menu, X, Trash2, Volume2, VolumeX, ShieldAlert, Check
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { 
  generateKeyPair, importPublicKey, deriveSharedKey, 
  encryptMessage, decryptMessage, encryptFile, decryptFile 
} from '../../../utils/e2ee';

// Utility: status color helper (used by both GamerAvatar and MessagesView)
const getStatusColor = (status) => {
  switch (status) {
    case 'online': return 'bg-emerald-400';
    case 'away': return 'bg-amber-400';
    case 'offline': return 'bg-gray-500';
    default: return null;
  }
};

// Custom Premium Vector Gaming Avatars
const GamerAvatar = ({ id, size = "w-8 h-8", status }) => {
  const getAvatarContent = () => {
    switch (id) {
      case 'xeno':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-xeno" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="16" fill="url(#grad-xeno)" />
            <path d="M7 25C7 18 11 11 16 11C21 11 25 18 25 25" fill="#1E1E2E" opacity="0.8" />
            <path d="M16 8C11 8 8 13 8 18C8 20 9 24 9 24C11 21 13 18 16 18C19 18 21 21 23 24C23 24 24 20 24 18C24 13 21 8 16 8Z" fill="#11111B" />
            <path d="M12 14L14 15" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 14L18 15" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'slayer':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-slayer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="16" fill="url(#grad-slayer)" />
            <rect x="10" y="10" width="12" height="13" rx="4" fill="#1E293B" />
            <path d="M8 20C8 16 10 12 16 12C22 12 24 16 24 20" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="12" y="13" width="8" height="2" rx="1" fill="#22D3EE" />
          </svg>
        );
      case 'coach_red':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-coach" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="16" fill="url(#grad-coach)" />
            <path d="M16 7C12 7 9 10 9 14C9 18 10 24 16 26C22 26 23 18 23 14C23 10 20 7 16 7Z" fill="#1E1B1B" />
            <path d="M12 21L13 19" stroke="#EF4444" strokeWidth="1.5" />
            <path d="M20 21L19 19" stroke="#EF4444" strokeWidth="1.5" />
            <circle cx="13" cy="13" r="1.5" fill="#FBBF24" />
            <circle cx="19" cy="13" r="1.5" fill="#FBBF24" />
          </svg>
        );
      case 'support-admin':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-admin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="16" fill="url(#grad-admin)" />
            <path d="M16 7L24 10V17C24 22 20 26 16 27C12 26 8 22 8 17V10L16 7Z" fill="#065F46" />
            <path d="M16 11V21" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 15H20" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'anandyt':
      default:
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-anand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="16" fill="url(#grad-anand)" />
            <path d="M7 25C7 18 11 11 16 11C21 11 25 18 25 25" fill="#1E1E2E" opacity="0.8" />
            <path d="M16 8C11 8 8 13 8 18C8 20 9 24 9 24C11 21 13 18 16 18C19 18 21 21 23 24C23 24 24 20 24 18C24 13 21 8 16 8Z" fill="#11111B" />
            <path d="M12 14L14 15" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 14L18 15" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // getStatusColor is now a module-level function

  return (
    <div className={`relative shrink-0 ${size}`}>
      {getAvatarContent()}
      {status && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#090d22] ${getStatusColor(status)}`} />
      )}
    </div>
  );
};

export const MessagesView = ({ setMobileMenuOpen }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // WebRTC & E2EE Refs
  const socketRef = useRef(null);
  const peerConnectionsRef = useRef({}); // Session ID -> RTCPeerConnection
  const localStreamRef = useRef(null);
  const localKeyPairRef = useRef(null);
  const sharedKeysRef = useRef({}); // Session ID -> CryptoKey

  // WebRTC & E2EE States
  const [remoteStreams, setRemoteStreams] = useState({}); // Session ID -> MediaStream
  const [isE2EEDerived, setIsE2EEDerived] = useState(false);
  const [roomMembers, setRoomMembers] = useState([]); // Array of { sessionId, username }

  // States
  const [activeTab, setActiveTab] = useState('channels'); // 'channels' | 'dms'
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showMembersList, setShowMembersList] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [mobileActiveView, setMobileActiveView] = useState('list'); // 'list' | 'chat'

  // Premium Features States
  const [callState, setCallState] = useState(null); // null | 'voice' | 'video'
  const [callStatus, setCallStatus] = useState('ringing'); // 'ringing' | 'connected'
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [newChatTab, setNewChatTab] = useState('channel'); // 'channel' | 'dm'
  const [newChatName, setNewChatName] = useState('');
  const [newChatSubtitle, setNewChatSubtitle] = useState('');

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState(() => localStorage.getItem('stagecore_user_status') || 'online');

  const [showComposerEmojiPicker, setShowComposerEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(null); // null | { name, type, url }
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showPinnedPanel, setShowPinnedPanel] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [mutedPlayers, setMutedPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_muted_players');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stagecore_muted_players', JSON.stringify(mutedPlayers));
  }, [mutedPlayers]);

  // Initial chats dataset exactly matching the user experience
  const initialChats = [
    {
      id: 'team-alpha',
      name: '#team-alpha',
      type: 'channel',
      subtitle: '5 MEMBERS ONLINE',
      membersCount: 5,
      unread: 0,
      isPinned: true,
      messages: [
        { sender: 'Xeno_Rider', text: 'Hey team, match starts in 15 mins. Get ready in lobby!', time: '04:12 PM', isSelf: false, avatar: 'xeno' },
        { sender: 'Slayer_99', text: 'Strat update: We rush A site on pistol round.', time: '04:14 PM', isSelf: false, avatar: 'slayer' },
        { sender: 'AnandYT', text: 'Got it. My ultimate is ready for retake.', time: '04:15 PM', isSelf: true, avatar: 'anandyt' }
      ]
    },
    {
      id: 'general-chat',
      name: '#general-chat',
      type: 'channel',
      subtitle: '128 MEMBERS ONLINE',
      membersCount: 128,
      unread: 2,
      isPinned: false,
      messages: [
        { sender: 'Coach_Red', text: 'Welcome all teams to StageCore Championship Season 4!', time: '02:00 PM', isSelf: false, avatar: 'coach_red' },
        { sender: 'StageCore_Admin', text: 'Please verify your rosters before 5:00 PM.', time: '02:05 PM', isSelf: false, avatar: 'support-admin' }
      ]
    },
    {
      id: 'xeno',
      name: 'Xeno_Rider',
      type: 'direct',
      subtitle: 'ONLINE • VALORANT IGL',
      status: 'online',
      unread: 0,
      isPinned: true,
      messages: [
        { sender: 'Xeno_Rider', text: 'Yo Anand! Ready for the scrimmage today?', time: '03:30 PM', isSelf: false, avatar: 'xeno' },
        { sender: 'AnandYT', text: 'Yeah man, warmups done. Let us invite Slayer.', time: '03:35 PM', isSelf: true, avatar: 'anandyt' }
      ]
    },
    {
      id: 'slayer',
      name: 'Slayer_99',
      type: 'direct',
      subtitle: 'AWAY • SNIPER SPECIALIST',
      status: 'away',
      unread: 0,
      isPinned: false,
      messages: [
        { sender: 'Slayer_99', text: 'Check the replay clip from yesterday, crazy headshot!', time: '01:20 PM', isSelf: false, avatar: 'slayer' }
      ]
    },
    {
      id: 'coach_red',
      name: 'Coach_Red',
      type: 'direct',
      subtitle: 'ONLINE • HEAD COACH',
      status: 'online',
      unread: 0,
      isPinned: false,
      messages: [
        { sender: 'Coach_Red', text: 'Review the VODs when you get a chance.', time: '11:00 AM', isSelf: false, avatar: 'coach_red' }
      ]
    }
  ];

  const DEFAULT_CHAT = {
    id: 'team-alpha',
    name: '#team-alpha',
    type: 'channel',
    subtitle: '5 MEMBERS ONLINE',
    membersCount: 5,
    unread: 0,
    messages: []
  };

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem('esports_chats_v2');
      const parsed = saved ? JSON.parse(saved) : null;
      return (Array.isArray(parsed) && parsed.length > 0) ? parsed : initialChats;
    } catch {
      return initialChats;
    }
  });

  const [activeChatId, setActiveChatId] = useState('team-alpha');
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0] || DEFAULT_CHAT;

  useEffect(() => {
    localStorage.setItem('esports_chats_v2', JSON.stringify(chats));
    window.dispatchEvent(new Event('messages_changed'));
  }, [chats]);

  useEffect(() => {
    if (activeChat && activeChat.unread > 0) {
      setChats(prevChats => prevChats.map(c => c.id === activeChatId ? { ...c, unread: 0 } : c));
    }
  }, [activeChatId, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll disabled per user request
  // useEffect(() => {
  //   scrollToBottom();
  // }, [activeChat.messages, typingUser]);

  useEffect(() => {
    setMobileActiveView('list');
  }, [activeTab]);

  // 1. Initialize ECDH Cryptographic Keypair
  useEffect(() => {
    async function initKeys() {
      try {
        const keys = await generateKeyPair();
        localKeyPairRef.current = keys;
        triggerToast("E2EE Keys Initialized on Device");
      } catch (err) {
        console.error("Keypair generation failed:", err);
      }
    }
    initKeys();
  }, []);

  // 2. Establish WebSocket Connection and handle Room Signaling
  useEffect(() => {
    if (!user) return;
    
    const wsUrl = "ws://localhost:8080/ws/signaling";
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      triggerToast("Secure Signaling Node Connected");
      // Join Room
      socket.send(JSON.stringify({
        type: "join-room",
        room: activeChatId,
        username: user.username || "AnandYT"
      }));
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      
      switch (msg.type) {
        case "room-state":
          setRoomMembers(msg.members || []);
          // Exchange public keys with existing members to derive shared E2EE keys
          if (localKeyPairRef.current) {
            msg.members.forEach(member => {
              socket.send(JSON.stringify({
                type: "signal",
                to: member.sessionId,
                room: activeChatId,
                signalType: "ecdh-exchange",
                publicKey: localKeyPairRef.current.publicKeyBase64
              }));
            });
          }
          break;

        case "user-joined":
          setRoomMembers(prev => [...prev, { sessionId: msg.sessionId, username: msg.username }]);
          // Exchange public keys with the newly joined member
          if (localKeyPairRef.current) {
            socket.send(JSON.stringify({
              type: "signal",
              to: msg.sessionId,
              room: activeChatId,
              signalType: "ecdh-exchange",
              publicKey: localKeyPairRef.current.publicKeyBase64
            }));
          }
          triggerToast(`${msg.username} joined channel`);
          break;

        case "user-left":
          setRoomMembers(prev => prev.filter(m => m.sessionId !== msg.sessionId));
          if (peerConnectionsRef.current[msg.sessionId]) {
            peerConnectionsRef.current[msg.sessionId].close();
            delete peerConnectionsRef.current[msg.sessionId];
          }
          setRemoteStreams(prev => {
            const next = { ...prev };
            delete next[msg.sessionId];
            return next;
          });
          break;

        case "signal":
          await handleIncomingSignal(msg);
          break;

        case "chat-message":
          await handleIncomingEncryptedMessage(msg);
          break;

        case "room-control":
          handleIncomingRoomControl(msg);
          break;

        default:
          break;
      }
    };

    socket.onclose = () => {
      triggerToast("Signaling Connection Closed");
    };

    return () => {
      socket.close();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
      peerConnectionsRef.current = {};
    };
  }, [activeChatId, user]);

  const handleIncomingSignal = async (msg) => {
    const { from, signalType, sdp, candidate, publicKey, sender } = msg;

    if (signalType === "ecdh-exchange") {
      try {
        const peerPubKeyObj = await importPublicKey(publicKey);
        const derivedKey = await deriveSharedKey(localKeyPairRef.current.privateKey, peerPubKeyObj);
        sharedKeysRef.current[from] = derivedKey;
        setIsE2EEDerived(true);

        // Send back our public key in reply
        socketRef.current.send(JSON.stringify({
          type: "signal",
          to: from,
          room: activeChatId,
          signalType: "ecdh-exchange-reply",
          publicKey: localKeyPairRef.current.publicKeyBase64
        }));
      } catch (err) {
        console.error("ECDH exchange failed:", err);
      }
    } else if (signalType === "ecdh-exchange-reply") {
      try {
        const peerPubKeyObj = await importPublicKey(publicKey);
        const derivedKey = await deriveSharedKey(localKeyPairRef.current.privateKey, peerPubKeyObj);
        sharedKeysRef.current[from] = derivedKey;
        setIsE2EEDerived(true);
      } catch (err) {
        console.error("ECDH exchange reply failed:", err);
      }
    } else if (signalType === "offer") {
      const pc = getOrCreatePeerConnection(from);
      await pc.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp }));
      
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => {
          pc.addTrack(track, localStreamRef.current);
        });
      }

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socketRef.current.send(JSON.stringify({
        type: "signal",
        to: from,
        room: activeChatId,
        signalType: "answer",
        sdp: answer.sdp
      }));
    } else if (signalType === "answer") {
      const pc = peerConnectionsRef.current[from];
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp }));
      }
    } else if (signalType === "candidate") {
      const pc = peerConnectionsRef.current[from];
      if (pc && candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    }
  };

  const getOrCreatePeerConnection = (peerSessionId) => {
    if (peerConnectionsRef.current[peerSessionId]) {
      return peerConnectionsRef.current[peerSessionId];
    }

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.send(JSON.stringify({
          type: "signal",
          to: peerSessionId,
          room: activeChatId,
          signalType: "candidate",
          candidate: event.candidate
        }));
      }
    };

    pc.ontrack = (event) => {
      setRemoteStreams(prev => ({
        ...prev,
        [peerSessionId]: event.streams[0]
      }));
    };

    peerConnectionsRef.current[peerSessionId] = pc;
    return pc;
  };

  const handleIncomingEncryptedMessage = async (msg) => {
    const { message, sender, from } = msg;
    const { text, iv, attachment: encryptedAttachment } = message;

    let decryptedText = "[Decryption Failed - Missing Shared Key]";
    let decryptedAttachment = null;

    const sharedKey = sharedKeysRef.current[from];
    if (sharedKey) {
      try {
        if (text) {
          decryptedText = await decryptMessage({ ciphertext: text, iv }, sharedKey);
        } else {
          decryptedText = "";
        }

        if (encryptedAttachment && encryptedAttachment.ciphertext) {
          const decryptedFileBlob = await decryptFile({
            ciphertext: encryptedAttachment.ciphertext,
            iv: encryptedAttachment.iv,
            type: encryptedAttachment.type
          }, sharedKey);

          const reader = new FileReader();
          reader.onloadend = () => {
            decryptedAttachment = {
              name: encryptedAttachment.name,
              type: encryptedAttachment.type,
              url: reader.result
            };
            appendMessageToChatLog(sender, decryptedText, decryptedAttachment, from);
          };
          reader.readAsDataURL(decryptedFileBlob);
          return;
        }
      } catch (err) {
        console.error("Message decryption failed:", err);
      }
    }

    appendMessageToChatLog(sender, decryptedText, null, from);
  };

  const handleIncomingRoomControl = (msg) => {
    const { action, target, sender } = msg;
    if (target === user?.username) {
      if (action === "kick") {
        triggerToast(`You were kicked from the room by ${sender}`);
        setActiveChatId(chats[0].id);
      } else if (action === "mute") {
        setIsMuted(true);
        triggerToast(`You were muted by ${sender}`);
      }
    } else {
      triggerToast(`Room control action: ${action} on ${target} by ${sender}`);
    }
  };

  const appendMessageToChatLog = (sender, text, attachmentData, sessionId) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const botMsg = {
      sender,
      text,
      time: timestamp,
      isSelf: false,
      avatar: sessionId ? sessionId.substring(0, 5) : 'xeno',
      attachment: attachmentData
    };

    setChats(current => current.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, botMsg]
        };
      }
      return c;
    }));
  };

  // Handle Send Message with client-side E2EE
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let messagePayload = {
      text: newMessage.trim(),
      attachment: null
    };

    // Encrypt content client-side using derived key for the room members
    const targetPeer = roomMembers[0];
    const sharedKey = targetPeer ? sharedKeysRef.current[targetPeer.sessionId] : null;

    if (sharedKey) {
      try {
        if (newMessage.trim()) {
          const encryptedText = await encryptMessage(newMessage.trim(), sharedKey);
          messagePayload.text = encryptedText.ciphertext;
          messagePayload.iv = encryptedText.iv;
        }

        if (attachment) {
          const fileBlob = await fetch(attachment.url).then(r => r.blob());
          const encryptedFile = await encryptFile(fileBlob, sharedKey);
          messagePayload.attachment = {
            ciphertext: encryptedFile.ciphertext,
            iv: encryptedFile.iv,
            name: attachment.name,
            type: attachment.type
          };
        }
      } catch (err) {
        console.error("Message encryption failed:", err);
      }
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: "chat-message",
        room: activeChatId,
        message: messagePayload
      }));
    }

    const userMsg = {
      sender: user?.username || 'AnandYT',
      text: newMessage.trim(),
      time: timestamp,
      isSelf: true,
      avatar: 'anandyt',
      attachment: attachment ? { ...attachment } : null
    };

    setChats(current => current.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMsg]
        };
      }
      return chat;
    }));

    setNewMessage('');
    setAttachment(null);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Call timer effect
  useEffect(() => {
    let interval;
    if (callState && callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState, callStatus]);

  const formatCallDuration = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = async (type) => {
    setCallState(type);
    setCallStatus('ringing');
    setShowChatMenu(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video'
      });
      localStreamRef.current = stream;

      // Add tracks to connections and negotiate SDP offers
      for (const member of roomMembers) {
        const pc = getOrCreatePeerConnection(member.sessionId);
        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socketRef.current.send(JSON.stringify({
          type: "signal",
          to: member.sessionId,
          room: activeChatId,
          signalType: "offer",
          sdp: offer.sdp
        }));
      }

      setCallStatus('connected');
    } catch (err) {
      console.error("Failed to capture local media stream:", err);
      setCallState(null);
      triggerToast("Media access denied or hardware error");
    }
  };

  const endCall = () => {
    setCallState(null);
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
    peerConnectionsRef.current = {};
    setRemoteStreams({});
    triggerToast("Call ended");
  };

  // Sync mic mute and camera track controls
  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted]);

  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOff;
      });
    }
  }, [isCameraOff]);

  const handleFileAttach = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachment({
          name: file.name,
          type: type || (file.type.startsWith('image') ? 'image' : 'file'),
          url: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePinChat = (chatId) => {
    setChats(current => current.map(c => {
      if (c.id === chatId) {
        return { ...c, isPinned: !c.isPinned };
      }
      return c;
    }));
    setShowChatMenu(false);
    triggerToast('Chat pin status updated');
  };

  const handleClearChat = (chatId) => {
    if (window.confirm("Are you sure you want to clear this chat history?")) {
      setChats(current => current.map(c => {
        if (c.id === chatId) {
          return { ...c, messages: [] };
        }
        return c;
      }));
      triggerToast('Chat history cleared');
    }
    setShowChatMenu(false);
  };

  const handleLeaveOrDeleteChat = (chatId) => {
    if (window.confirm("Are you sure you want to remove this chat?")) {
      const remainingChats = chats.filter(c => c.id !== chatId);
      setChats(remainingChats);
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id);
      }
      triggerToast('Chat removed');
    }
    setShowChatMenu(false);
  };

  const handleCreateChannel = (e) => {
    if (e) e.preventDefault();
    if (!newChatName.trim()) return;

    const formattedName = newChatName.trim().startsWith('#') ? newChatName.trim() : `#${newChatName.trim()}`;
    const newChan = {
      id: `chan-${Date.now()}`,
      name: formattedName,
      type: 'channel',
      subtitle: newChatSubtitle.trim() || 'Active members online',
      membersCount: Math.floor(Math.random() * 20) + 1,
      unread: 0,
      messages: []
    };

    setChats([newChan, ...chats]);
    setActiveChatId(newChan.id);
    setIsNewChatModalOpen(false);
    setNewChatName('');
    setNewChatSubtitle('');
    triggerToast(`Created channel ${formattedName}`);
  };

  const handleCreateDM = (friend) => {
    // Check if DM already exists
    const existing = chats.find(c => c.id === friend.id && c.type === 'direct');
    if (existing) {
      setActiveChatId(existing.id);
      setIsNewChatModalOpen(false);
      return;
    }

    const newDM = {
      id: friend.id,
      name: friend.name,
      type: 'direct',
      subtitle: friend.subtitle || friend.status.toUpperCase(),
      status: friend.status,
      unread: 0,
      messages: []
    };

    setChats([newDM, ...chats]);
    setActiveChatId(friend.id);
    setIsNewChatModalOpen(false);
    triggerToast(`Started DM with @${friend.name}`);
  };

  const handleTogglePinMessage = (msgIndex) => {
    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        const updatedMessages = c.messages.map((m, idx) => {
          if (idx === msgIndex) {
            const nextPinned = !m.isPinned;
            triggerToast(nextPinned ? 'Message pinned' : 'Message unpinned');
            return { ...m, isPinned: nextPinned };
          }
          return m;
        });
        return { ...c, messages: updatedMessages };
      }
      return c;
    });
    setChats(updatedChats);
  };

  const handleDeleteMessage = (msgIndex) => {
    if (window.confirm("Delete this message?")) {
      setChats(current => current.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: c.messages.filter((_, idx) => idx !== msgIndex)
          };
        }
        return c;
      }));
      triggerToast('Message deleted');
    }
  };

  const handleToggleMutePlayer = (playerName) => {
    if (mutedPlayers.includes(playerName)) {
      setMutedPlayers(prev => prev.filter(name => name !== playerName));
      triggerToast(`${playerName} unmuted`);
    } else {
      setMutedPlayers(prev => [...prev, playerName]);
      triggerToast(`${playerName} muted`);
    }
  };

  // Separation filters with sorting
  const sortChats = (chatsArray) => {
    return [...chatsArray].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  };

  const channelsList = sortChats(chats.filter(chat => chat.type === 'channel' && chat.name.toLowerCase().includes(searchQuery.toLowerCase())));
  const dmsList = sortChats(chats.filter(chat => chat.type === 'direct' && chat.name.toLowerCase().includes(searchQuery.toLowerCase())));

  // Active filter tab display logic for mobile/tablet responsive lists
  const filteredList = activeTab === 'channels' ? channelsList : dmsList;

  return (
    <div className="w-full h-full flex text-left animate-fadeIn overflow-hidden bg-[#050816]">
      
      {/* 1. SIDEBAR ROSTER PANEL (320px Width) */}
      <div className={`w-full lg:w-80 border-r border-white/5 flex flex-col bg-[#090d22] shrink-0 ${mobileActiveView === 'list' ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen && setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer mr-1"
              title="Open Navigation"
            >
              <Menu size={16} />
            </button>
            <h2 className="text-xs font-black text-white uppercase tracking-wider">Messages</h2>
          </div>
          <button 
            onClick={() => {
              setNewChatTab('channel');
              setIsNewChatModalOpen(true);
            }}
            className="p-1.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer" 
            title="New Chat"
          >
            <SquarePen size={14} />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search channels or players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050816] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
            />
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 px-4 mb-2">
          <button
            onClick={() => setActiveTab('channels')}
            className={`flex-1 pb-2 text-[9px] font-black uppercase tracking-wider transition-all border-b-2 text-center cursor-pointer ${
              activeTab === 'channels' 
                ? 'border-gaming-purple text-white' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            Channels
          </button>
          <button
            onClick={() => setActiveTab('dms')}
            className={`flex-1 pb-2 text-[9px] font-black uppercase tracking-wider transition-all border-b-2 text-center cursor-pointer ${
              activeTab === 'dms' 
                ? 'border-gaming-purple text-white' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            Direct Messages
          </button>
        </div>

        {/* Scrollable List containing Channels and Direct Messages */}
        <div className="flex-grow overflow-y-auto custom-scrollbar px-3 pb-4 space-y-4">
          
          {/* Channels Roster Section */}
          {(activeTab === 'channels' || searchQuery) && (
            <div className="space-y-1">
              {channelsList.map(chat => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setMobileActiveView('chat');
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left relative group ${
                      isActive 
                        ? 'bg-gaming-purple/10 border border-gaming-purple/20' 
                        : 'hover:bg-white/3 border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isActive 
                        ? 'bg-gaming-purple/20 text-[#a855f7] border border-gaming-purple/30'
                        : 'bg-white/5 text-gray-400 border border-white/5'
                    }`}>
                      <Hash size={13} />
                    </div>

                    <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <span className={`text-[10px] font-black tracking-wide truncate block uppercase ${isActive ? 'text-white' : 'text-gray-300'}`}>
                          {chat.name}
                        </span>
                        <span className="text-[8px] text-gray-500 font-bold truncate block mt-0.5 uppercase tracking-wider">
                          {chat.subtitle}
                        </span>
                      </div>
                      {chat.isPinned && (
                        <Pin size={10} className="rotate-45 text-amber-400 shrink-0" />
                      )}
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Direct Messages Roster Section */}
          {(activeTab === 'dms' || searchQuery) && (
            <div className="space-y-1">
              <div className="pt-2 pb-1.5 px-2 flex items-center justify-between">
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Direct Messages</span>
                <Settings 
                  size={10} 
                  className="text-gray-600 hover:text-white cursor-pointer transition-colors" 
                  onClick={() => setIsSettingsModalOpen(true)}
                  title="DM Settings"
                />
              </div>

              {dmsList.map(chat => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setMobileActiveView('chat');
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left relative group ${
                      isActive 
                        ? 'bg-gaming-purple/10 border border-gaming-purple/20' 
                        : 'hover:bg-white/3 border border-transparent'
                    }`}
                  >
                    <GamerAvatar id={chat.id} size="w-8 h-8" status={chat.status} />

                    <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <span className={`text-[10px] font-black tracking-wide truncate block uppercase ${isActive ? 'text-white' : 'text-gray-300'}`}>
                          {chat.name}
                        </span>
                        <span className="text-[8px] text-gray-500 font-bold truncate block mt-0.5 uppercase tracking-wider">
                          {chat.subtitle}
                        </span>
                      </div>
                      {chat.isPinned && (
                        <Pin size={10} className="rotate-45 text-amber-400 shrink-0" />
                      )}
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* 2. CHAT PANEL AREA */}
      <div className={`flex-1 flex-col min-w-0 bg-[#050816] relative ${mobileActiveView === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Sticky Chat Header */}
        <div className="h-16 px-6 border-b border-white/5 bg-[#03050f]/30 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back button on mobile */}
            <button
              type="button"
              onClick={() => setMobileActiveView('list')}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/3 border border-white/5 hover:bg-white/5 transition-colors shrink-0 cursor-pointer mr-1"
              title="Back to Chats"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="min-w-0">
              <h3 className="text-xs font-black text-white uppercase tracking-wider truncate">{activeChat.name}</h3>
              <span className="text-[8px] text-gray-500 font-bold block uppercase tracking-wider">{activeChat.subtitle}</span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowPinnedPanel(!showPinnedPanel)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                showPinnedPanel 
                  ? 'bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title="Pinned Messages"
            >
              <Pin size={13} className="rotate-45" />
            </button>
            {activeChat.type === 'channel' && (
              <button 
                onClick={() => setShowMembersList(!showMembersList)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  showMembersList 
                    ? 'bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`} 
                title="Toggle Members List"
              >
                <Users size={13} />
              </button>
            )}
            <button 
              onClick={() => startCall('voice')}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
              title="Voice Call"
            >
              <Phone size={13} />
            </button>
            <button 
              onClick={() => startCall('video')}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
              title="Video Call"
            >
              <Video size={13} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowChatMenu(!showChatMenu)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  showChatMenu 
                    ? 'bg-white/10 text-white border border-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title="Chat Settings"
              >
                <MoreHorizontal size={13} />
              </button>
              {showChatMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#090d22] border border-white/10 p-1.5 shadow-xl z-50 text-xs animate-slideDown">
                  <button 
                    onClick={() => handleTogglePinChat(activeChat.id)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Pin size={12} className="rotate-45 shrink-0" />
                    <span>{activeChat.isPinned ? 'Unpin Chat' : 'Pin Chat to Top'}</span>
                  </button>
                  <button 
                    onClick={() => handleClearChat(activeChat.id)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Trash2 size={12} className="shrink-0" />
                    <span>Clear Chat History</span>
                  </button>
                  <button 
                    onClick={() => handleLeaveOrDeleteChat(activeChat.id)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-400 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <X size={12} className="shrink-0" />
                    <span>{activeChat.type === 'channel' ? 'Leave Channel' : 'Delete DM'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Conversation Pane */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 custom-scrollbar bg-gradient-to-b from-transparent to-[#050816]/30">
          
          <div className="flex items-center justify-center my-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <span className="relative px-3 py-0.5 rounded-full text-[8px] font-bold bg-[#050816] stroke-none text-gray-500 uppercase tracking-widest font-mono border border-white/5">
              Today, 25 May 2024
            </span>
          </div>

          <div className="text-center text-[9px] text-gray-600 font-bold mb-4">
            XENO created this channel. • 04:10 PM
          </div>

          {/* Messages Mapping */}
          {activeChat.messages && activeChat.messages.length > 0 ? (
            activeChat.messages.map((msg, index) => {
              const isSelf = msg.isSelf;

              return (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[80%] group relative ${isSelf ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'}`}
                >
                  <GamerAvatar id={msg.avatar} size="w-8 h-8" />

                  <div className="space-y-1 max-w-full">
                    {/* Header */}
                    <div className={`flex items-center gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[9px] font-black text-white uppercase tracking-wider">{msg.sender}</span>
                      <span className="text-[8px] text-gray-500 font-mono font-semibold">{msg.time}</span>
                      {msg.isPinned && (
                        <span className="text-amber-400 flex items-center gap-0.5" title="Pinned message">
                          <Pin size={8} className="rotate-45" />
                          <span className="text-[6px] font-black uppercase tracking-widest">pinned</span>
                        </span>
                      )}
                    </div>

                    {/* Message Bubble + Actions */}
                    <div className={`relative flex items-center gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
                      
                      {/* Bubble */}
                      <div className={`p-3 rounded-2xl text-[10px] font-semibold leading-relaxed border transition-all ${
                        isSelf
                          ? 'bg-gradient-to-tr from-gaming-purple to-[#9055ff] border-gaming-purple/20 text-white rounded-tr-none text-left'
                          : 'bg-[#0d1127]/60 border-white/5 text-gray-200 rounded-tl-none text-left'
                      }`}>
                        
                        {/* Staged Attachment Rendering */}
                        {msg.attachment && (
                          <div className="mb-2.5 rounded-lg overflow-hidden border border-white/10 bg-[#050816]">
                            {msg.attachment.type === 'image' ? (
                              <img 
                                src={msg.attachment.url} 
                                alt="Shared image" 
                                className="max-w-xs max-h-48 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => window.open(msg.attachment.url, '_blank')}
                              />
                            ) : (
                              <a 
                                href={msg.attachment.url} 
                                download={msg.attachment.name}
                                className="flex items-center gap-2 p-2 text-gaming-purple hover:text-white transition-colors"
                              >
                                <Paperclip size={14} className="shrink-0" />
                                <div className="min-w-0 text-left">
                                  <p className="text-[9px] font-black truncate">{msg.attachment.name}</p>
                                  <p className="text-[7px] text-gray-500 uppercase">Download File</p>
                                </div>
                              </a>
                            )}
                          </div>
                        )}

                        {/* Text */}
                        {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}
                      </div>

                      {/* Action Hover Controls (Absolute floating) */}
                      <div className={`hidden group-hover:flex items-center gap-1.5 p-1 rounded-lg bg-[#090d22] border border-white/10 shadow-lg shrink-0`}>
                        <button
                          type="button"
                          onClick={() => handleTogglePinMessage(index)}
                          className={`p-1 rounded hover:bg-white/5 transition-colors cursor-pointer ${msg.isPinned ? 'text-amber-400' : 'text-gray-400 hover:text-white'}`}
                          title={msg.isPinned ? 'Unpin message' : 'Pin message'}
                        >
                          <Pin size={10} className="rotate-45" />
                        </button>
                        
                        {isSelf && (
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(index)}
                            className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 size={10} />
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">No Messages</span>
              <p className="text-[8px] text-gray-600 mt-1 max-w-[200px] leading-relaxed">
                Start typing below to send your first message to this conversation.
              </p>
            </div>
          )}

          {/* Typing Indicator */}
          {typingUser && (
            <div className="flex items-center gap-2 mr-auto animate-pulse">
              <GamerAvatar id={activeChatId} size="w-6 h-6" />
              <div className="bg-white/3 border border-white/5 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">{typingUser} is typing</span>
                <span className="flex gap-0.5 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-gaming-purple animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 rounded-full bg-gaming-purple animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 rounded-full bg-gaming-purple animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sticky Chat Composer bottom panel */}
        <div className="p-4 border-t border-white/5 bg-[#03050f]/30 shrink-0 z-10 relative">
          
          {/* Attachment Preview Banner */}
          {attachment && (
            <div className="mb-2.5 p-2 rounded-xl bg-[#090d22] border border-white/5 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2 min-w-0">
                {attachment.type === 'image' ? (
                  <img src={attachment.url} alt="upload preview" className="w-8 h-8 rounded object-cover shrink-0 border border-white/10" />
                ) : (
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gaming-purple shrink-0">
                    <Paperclip size={14} />
                  </div>
                )}
                <div className="truncate text-left">
                  <p className="font-bold text-[9px] truncate">{attachment.name}</p>
                  <p className="text-[7px] text-gray-500 uppercase">{attachment.type}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setAttachment(null)}
                className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* Inline Emoji Picker Panel */}
          {showComposerEmojiPicker && (
            <div className="absolute bottom-20 left-4 bg-[#090d22] border border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 w-56 animate-fadeIn">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/5 text-[9px] text-gray-500 uppercase font-black tracking-wider">
                <span>Select Emoji</span>
                <button type="button" onClick={() => setShowComposerEmojiPicker(false)} className="text-gray-500 hover:text-white">
                  <X size={10} />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5 justify-items-center">
                {['👍', '🔥', '😂', '😮', '😢', '❤️', '💪', '🎮', '🏆', '👑', '⚡', '🎯', '💥', '💀', '👽', '👾', '💯', '🚀', '🙌', '🎉', '🌟', '🔔', '🤫', '🤝'].map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setNewMessage(prev => prev + emoji);
                      setShowComposerEmojiPicker(false);
                    }}
                    className="text-sm p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hidden File Upload Inputs */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFileAttach(e, 'file')} 
            className="hidden" 
          />
          <input 
            type="file" 
            accept="image/*" 
            ref={imageInputRef} 
            onChange={(e) => handleFileAttach(e, 'image')} 
            className="hidden" 
          />

          <form 
            onSubmit={handleSendMessage}
            className="glass-panel bg-[#050816]/70 border border-white/10 rounded-2xl p-2.5 flex items-center gap-3.5"
          >
            {/* Input helpers */}
            <div className="flex items-center gap-1 shrink-0">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/3 transition-colors cursor-pointer" 
                title="Attach file"
              >
                <Paperclip size={13} />
              </button>
              <button 
                type="button" 
                onClick={() => imageInputRef.current?.click()}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/3 transition-colors cursor-pointer" 
                title="Add Image"
              >
                <Image size={13} />
              </button>
              <button 
                type="button" 
                onClick={() => setShowComposerEmojiPicker(!showComposerEmojiPicker)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/3 transition-colors cursor-pointer" 
                title="Add Emoji"
              >
                <Smile size={13} />
              </button>
            </div>

            <input
              type="text"
              placeholder={`Message ${activeChat.name}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-transparent border-0 text-[10px] text-white focus:outline-none placeholder-gray-600 font-semibold py-1"
            />

            <button
              type="submit"
              className="p-2 rounded-xl bg-gaming-purple hover:bg-gaming-purple/90 text-white shadow-md shadow-gaming-purple/20 transition-all cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send size={11} />
            </button>
          </form>
        </div>

      </div>

      {/* 3. MEMBERS PANEL: RETRACTABLE RIGHT SIDEBAR (240px Width) */}
      {showMembersList && activeChat.type === 'channel' && (
        <div className="hidden xl:flex w-60 border-l border-white/5 flex-col bg-[#090d22] shrink-0 animate-slideRight">
          
          <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 className="text-[10px] font-black text-white uppercase tracking-wider">Lobby Members</h3>
            <span className="px-1.5 py-0.5 rounded bg-gaming-purple/20 border border-gaming-purple/35 text-white text-[8px] font-black">
              {activeChat.membersCount}
            </span>
          </div>

          <div className="flex-grow p-4 space-y-5 overflow-y-auto custom-scrollbar bg-[#03050f]/10">
            
            {/* Roster Group: Team Staff */}
            <div className="space-y-2">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block">Leadership</span>
              <div className="space-y-1.5">
                <div 
                  onClick={() => setSelectedMember({ id: 'xeno', name: 'Xeno', role: 'LEADER', status: 'online' })}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-white/2 border border-white/3 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <GamerAvatar id="xeno" size="w-6 h-6" />
                    <span className="text-[9px] font-extrabold text-white truncate uppercase flex items-center gap-1">
                      Xeno
                      {mutedPlayers.includes('Xeno') && <VolumeX size={8} className="text-rose-400 shrink-0" />}
                    </span>
                  </div>
                  <span className="px-1 py-0.5 rounded text-[6px] font-black bg-purple-500/10 text-purple-400 border border-purple-500/20">LEADER</span>
                </div>

                <div 
                  onClick={() => setSelectedMember({ id: 'coach_red', name: 'Coach_Red', role: 'COACH', status: 'offline' })}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-white/2 border border-white/3 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                    <GamerAvatar id="coach_red" size="w-6 h-6" />
                    <span className="text-[9px] font-extrabold text-gray-400 truncate uppercase flex items-center gap-1">
                      Coach_Red
                      {mutedPlayers.includes('Coach_Red') && <VolumeX size={8} className="text-rose-400 shrink-0" />}
                    </span>
                  </div>
                  <span className="px-1 py-0.5 rounded text-[6px] font-black bg-red-500/10 text-red-400 border border-red-500/20">COACH</span>
                </div>
              </div>
            </div>

            {/* Roster Group: Team Competitors */}
            <div className="space-y-2">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block">Active Roster</span>
              <div className="space-y-1.5">
                
                {/* Current Logged-in User */}
                <div 
                  onClick={() => setSelectedMember({ id: 'anandyt', name: 'AnandYT', role: 'SNIPER', status: userStatus })}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-gaming-purple/5 border border-gaming-purple/20 hover:bg-gaming-purple/10 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusColor(userStatus)}`} />
                    <GamerAvatar id="anandyt" size="w-6 h-6" />
                    <span className="text-[9px] font-extrabold text-white truncate uppercase">AnandYT (You)</span>
                  </div>
                  <span className="px-1 py-0.5 rounded text-[6px] font-black bg-purple-600/15 text-purple-400 border border-purple-600/20">SNIPER</span>
                </div>

                <div 
                  onClick={() => setSelectedMember({ id: 'slayer', name: 'Slayer', role: 'ENTRY', status: 'away' })}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-white/2 border border-white/3 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <GamerAvatar id="slayer" size="w-6 h-6" />
                    <span className="text-[9px] font-extrabold text-white truncate uppercase flex items-center gap-1">
                      Slayer
                      {mutedPlayers.includes('Slayer') && <VolumeX size={8} className="text-rose-400 shrink-0" />}
                    </span>
                  </div>
                  <span className="px-1 py-0.5 rounded text-[6px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20">ENTRY</span>
                </div>

              </div>
            </div>

            {/* Integration info */}
            <div className="p-3 bg-white/2 border border-white/5 rounded-2xl text-[8px] text-gray-500 font-semibold leading-relaxed">
              <span className="text-white block mb-1 uppercase text-[9px] font-black">Lobby Stats Sync</span>
              Roster statistics are verified via FACEIT tournament database integration.
            </div>

          </div>
        </div>
      )}

      {/* Pinned Messages Sidebar Panel */}
      {showPinnedPanel && (
        <div className="w-60 border-l border-white/5 flex flex-col bg-[#090d22] shrink-0 animate-slideLeft z-10">
          <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 className="text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Pin size={11} className="rotate-45 text-amber-400" />
              <span>Pinned Messages</span>
            </h3>
            <button 
              onClick={() => setShowPinnedPanel(false)}
              className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>

          <div className="flex-grow p-4 space-y-3 overflow-y-auto custom-scrollbar bg-[#03050f]/10">
            {activeChat.messages && activeChat.messages.filter(m => m.isPinned).length > 0 ? (
              activeChat.messages.map((msg, index) => {
                if (!msg.isPinned) return null;
                return (
                  <div key={index} className="p-3 bg-[#0d1127] border border-white/5 rounded-2xl space-y-2 relative group/pinned text-left">
                    <div className="flex items-center gap-2">
                      <GamerAvatar id={msg.avatar} size="w-5 h-5" />
                      <div className="min-w-0">
                        <span className="text-[8px] font-black text-white uppercase tracking-wider truncate block">{msg.sender}</span>
                        <span className="text-[6px] text-gray-500 font-mono font-semibold block">{msg.time}</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-300 font-semibold leading-relaxed line-clamp-3">
                      {msg.text}
                    </p>
                    {msg.attachment && (
                      <div className="text-[7px] text-gaming-purple font-black flex items-center gap-1 uppercase bg-gaming-purple/10 border border-gaming-purple/20 px-1.5 py-0.5 rounded">
                        <Paperclip size={8} />
                        <span>{msg.attachment.type} attached</span>
                      </div>
                    )}
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => handleTogglePinMessage(activeChat.messages.indexOf(msg))}
                        className="text-[7px] font-black text-rose-400 hover:text-rose-300 uppercase cursor-pointer"
                      >
                        Unpin
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Pin size={24} className="text-gray-700 rotate-45 mb-2" />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">No Pinned Messages</span>
                <p className="text-[7px] text-gray-600 mt-1 max-w-[150px] leading-relaxed">
                  Hover any message in the feed and click the pin icon to keep important details handy.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Chat / Channel Modal */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#050816]/80 backdrop-blur-sm z-[100] animate-fadeIn">
          <div className="w-96 bg-[#090d22]/90 border border-white/10 rounded-2xl p-5 shadow-2xl relative glass-panel text-left">
            {/* Close */}
            <button 
              onClick={() => setIsNewChatModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <X size={14} />
            </button>

            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4">Create or Start Conversation</h3>
            
            {/* Tabs */}
            <div className="flex border-b border-white/5 mb-4">
              <button
                onClick={() => setNewChatTab('channel')}
                className={`flex-1 pb-2 text-[9px] font-black uppercase tracking-wider transition-all border-b-2 text-center cursor-pointer ${
                  newChatTab === 'channel' 
                    ? 'border-gaming-purple text-white' 
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                Create Channel
              </button>
              <button
                onClick={() => setNewChatTab('dm')}
                className={`flex-1 pb-2 text-[9px] font-black uppercase tracking-wider transition-all border-b-2 text-center cursor-pointer ${
                  newChatTab === 'dm' 
                    ? 'border-gaming-purple text-white' 
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                Direct Message
              </button>
            </div>

            {newChatTab === 'channel' ? (
              <form onSubmit={handleCreateChannel} className="space-y-4">
                <div>
                  <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Channel Name</label>
                  <input
                    type="text"
                    placeholder="e.g. general-talk"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2.5 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Topic / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Share gaming strategies and media files"
                    value={newChatSubtitle}
                    onChange={(e) => setNewChatSubtitle(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2.5 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-black text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
                >
                  Create Channel
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Select Player</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                  {[
                    { id: 'xeno', name: 'Xeno', status: 'online', subtitle: 'Online' },
                    { id: 'slayer', name: 'Slayer', status: 'away', subtitle: 'Away' },
                    { id: 'coach-red', name: 'Coach_Red', status: 'offline', subtitle: 'Offline' },
                    { id: 'support-admin', name: 'StageCore Admin (Support)', status: 'online', subtitle: 'Online' }
                  ].map(friend => (
                    <button
                      key={friend.id}
                      onClick={() => handleCreateDM(friend)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 cursor-pointer text-left transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <GamerAvatar id={friend.id} size="w-7 h-7" status={friend.status} />
                        <div className="min-w-0">
                          <span className="text-[9px] font-black text-white uppercase tracking-wider block group-hover:text-gaming-purple transition-colors">{friend.name}</span>
                          <span className="text-[7px] text-gray-500 font-bold block uppercase mt-0.5">{friend.subtitle}</span>
                        </div>
                      </div>
                      <ChevronLeft size={10} className="text-gray-600 rotate-180 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings / User Presence Status Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#050816]/80 backdrop-blur-sm z-[100] animate-fadeIn">
          <div className="w-80 bg-[#090d22]/90 border border-white/10 rounded-2xl p-5 shadow-2xl relative glass-panel text-left">
            {/* Close */}
            <button 
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <X size={14} />
            </button>

            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4">Set Status Presence</h3>

            <div className="space-y-2">
              {[
                { value: 'online', label: 'Online', desc: 'Visible and active in chat lobbies', color: 'bg-emerald-400' },
                { value: 'away', label: 'Away', desc: 'Appear idle or temporarily inactive', color: 'bg-amber-400' },
                { value: 'dnd', label: 'Do Not Disturb', desc: 'Disable sounds and push alerts', color: 'bg-rose-500' },
                { value: 'offline', label: 'Offline / Invisible', desc: 'Keep presence hidden', color: 'bg-gray-500' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setUserStatus(opt.value);
                    localStorage.setItem('stagecore_user_status', opt.value);
                    setIsSettingsModalOpen(false);
                    triggerToast(`Status updated to ${opt.label}`);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-left transition-all ${
                    userStatus === opt.value 
                      ? 'bg-gaming-purple/15 border-gaming-purple text-white' 
                      : 'bg-white/2 border-white/5 hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${opt.color}`} />
                    <div className="min-w-0">
                      <span className="text-[9px] font-black uppercase tracking-wider block">{opt.label}</span>
                      <span className="text-[7px] text-gray-500 font-bold block mt-0.5">{opt.desc}</span>
                    </div>
                  </div>
                  {userStatus === opt.value && (
                    <Check size={12} className="text-gaming-purple shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voice / Video Call Overlay */}
      {callState && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#050816]/95 z-[200] animate-fadeIn">
          <div className="w-full max-w-md p-8 flex flex-col items-center justify-between h-full max-h-[500px] text-center relative">
            
            {/* Subtle Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(124,58,237,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(124,58,237,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Caller Details */}
            <div className="mt-8 flex flex-col items-center">
              <div className="relative">
                {/* Ringing/Connected Pulse Waves */}
                {callStatus === 'ringing' ? (
                  <div className="absolute inset-0 rounded-full border border-gaming-purple animate-ping scale-150 opacity-20" />
                ) : (
                  <div className="absolute inset-0 rounded-full border border-emerald-400 animate-pulse scale-110 opacity-30" />
                )}
                <GamerAvatar id={activeChat.id} size="w-24 h-24" />
              </div>
              
              <h3 className="text-sm font-black text-white uppercase tracking-widest mt-6">
                {activeChat.name}
              </h3>
              
              <p className="text-[8px] font-black text-gray-500 uppercase mt-1.5 tracking-widest flex items-center gap-1.5">
                {callStatus === 'ringing' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-gaming-purple animate-pulse" />
                    <span>Outgoing {callState} call...</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Call Connected</span>
                  </>
                )}
              </p>

              {callStatus === 'connected' && (
                <p className="text-xs text-white font-black font-mono mt-3 uppercase tracking-wider bg-white/3 border border-white/5 px-3 py-1 rounded-full">
                  {formatCallDuration(callDuration)}
                </p>
              )}
            </div>

            {/* Video Mock stream */}
            {callState === 'video' && callStatus === 'connected' && (
              <div className="w-64 h-40 rounded-xl border border-white/10 bg-[#090d22] relative overflow-hidden my-4 shadow-xl">
                {/* Local camera preview */}
                <div className="absolute top-1.5 right-1.5 w-20 h-12 rounded bg-[#03050f] border border-white/10 overflow-hidden flex items-center justify-center z-10">
                  {isCameraOff ? (
                    <Video size={10} className="text-gray-600 rotate-45" />
                  ) : (
                    <video
                      ref={el => { if (el && localStreamRef.current) el.srcObject = localStreamRef.current; }}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Remote stream video feeds */}
                {Object.values(remoteStreams).length > 0 ? (
                  Object.values(remoteStreams).map((stream, idx) => (
                    <video
                      key={idx}
                      ref={el => { if (el) el.srcObject = stream; }}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ))
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-indigo-900/40 to-slate-900/60 flex items-center justify-center">
                    <span className="text-[8px] text-gray-400 font-mono font-semibold uppercase tracking-wider">WAITING FOR MEDIA FEED...</span>
                  </div>
                )}
              </div>
            )}

            {/* Remote Audio Feeds (for voice-only calls) */}
            {callState === 'voice' && callStatus === 'connected' && (
              <div className="hidden">
                {Object.entries(remoteStreams).map(([sessionId, stream]) => (
                  <audio
                    key={sessionId}
                    ref={el => { if (el) el.srcObject = stream; }}
                    autoPlay
                  />
                ))}
              </div>
            )}

            {/* Active Call Controls */}
            <div className="mb-6 flex items-center gap-4">
              {/* Mute Button */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  triggerToast(isMuted ? 'Microphone unmuted' : 'Microphone muted');
                }}
                className={`p-3.5 rounded-full transition-all cursor-pointer border ${
                  isMuted 
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400' 
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Video Toggle Button (for video calls) */}
              {callState === 'video' && (
                <button
                  onClick={() => {
                    setIsCameraOff(!isCameraOff);
                    triggerToast(isCameraOff ? 'Camera enabled' : 'Camera disabled');
                  }}
                  className={`p-3.5 rounded-full transition-all cursor-pointer border ${
                    isCameraOff 
                      ? 'bg-rose-500/10 border-rose-500 text-rose-400' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  <Video size={15} />
                </button>
              )}

              {/* End Call Button */}
              <button
                onClick={endCall}
                className="p-3.5 rounded-full bg-rose-500 border border-rose-600 text-white hover:bg-rose-600 transition-all cursor-pointer shadow-lg shadow-rose-500/20"
                title="End Call"
              >
                <X size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Roster Member Click Popover Profile Card */}
      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#050816]/80 backdrop-blur-sm z-[100] animate-fadeIn">
          <div className="w-72 bg-[#090d22]/90 border border-white/10 rounded-2xl p-5 shadow-2xl relative glass-panel text-left">
            {/* Close */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <X size={14} />
            </button>

            {/* Avatar & Name */}
            <div className="flex flex-col items-center text-center mt-2">
              <GamerAvatar id={selectedMember.id} size="w-16 h-16" status={selectedMember.status} />
              <h4 className="text-xs font-black text-white mt-3 uppercase tracking-wider">{selectedMember.name}</h4>
              <p className="text-[8px] text-gray-500 font-bold uppercase mt-0.5">{selectedMember.role}</p>
              
              <div className="flex items-center gap-1.5 mt-2 bg-white/2 px-2 py-0.5 border border-white/5 rounded-full text-[8px] text-gray-400 font-semibold uppercase">
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(selectedMember.status)}`} />
                <span>{selectedMember.status}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mt-4 p-2 bg-white/2 rounded-xl border border-white/5 text-center">
              <div>
                <span className="text-[7px] text-gray-500 block uppercase font-bold">Matches</span>
                <span className="text-[9px] text-white font-extrabold font-mono">142</span>
              </div>
              <div>
                <span className="text-[7px] text-gray-500 block uppercase font-bold">Win Rate</span>
                <span className="text-[9px] text-emerald-400 font-extrabold font-mono">68.4%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 space-y-2">
              {selectedMember.id !== 'anandyt' && (
                <>
                  <button 
                    onClick={() => {
                      handleCreateDM({
                        id: selectedMember.id,
                        name: selectedMember.name,
                        status: selectedMember.status,
                        subtitle: selectedMember.status === 'online' ? 'Online' : selectedMember.status === 'away' ? 'Away' : 'Offline'
                      });
                      setSelectedMember(null);
                    }}
                    className="w-full py-2 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-black text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
                  >
                    Direct Message
                  </button>
                  
                  <button 
                    onClick={() => {
                      handleToggleMutePlayer(selectedMember.name);
                      setSelectedMember(null);
                    }}
                    className="w-full py-2 bg-white/3 hover:bg-white/5 border border-white/5 text-gray-300 hover:text-white font-black text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {mutedPlayers.includes(selectedMember.name) ? (
                      <>
                        <Volume2 size={11} className="text-emerald-400" />
                        <span>Unmute Player</span>
                      </>
                    ) : (
                      <>
                        <VolumeX size={11} className="text-rose-400" />
                        <span>Mute Player</span>
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to report @${selectedMember.name} for unsportsmanlike conduct?`)) {
                        triggerToast(`Report submitted for @${selectedMember.name}`);
                      }
                      setSelectedMember(null);
                    }}
                    className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-rose-400 font-black text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert size={11} />
                    <span>Report Player</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Styled Glassmorphic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#090d22]/95 border border-gaming-purple/30 text-white px-4 py-2.5 rounded-xl text-[9px] font-extrabold uppercase tracking-wider shadow-2xl flex items-center gap-2 z-[250] animate-slideUp max-w-xs glass-panel">
          <div className="w-1.5 h-1.5 rounded-full bg-gaming-purple animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
