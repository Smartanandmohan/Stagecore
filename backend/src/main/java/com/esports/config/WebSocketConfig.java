package com.esports.config;

import com.esports.controller.SignalingWebSocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(signalingWebSocketHandler(), "/ws/signaling")
                .setAllowedOrigins("*");
    }

    @Bean
    public SignalingWebSocketHandler signalingWebSocketHandler() {
        return new SignalingWebSocketHandler();
    }
}
