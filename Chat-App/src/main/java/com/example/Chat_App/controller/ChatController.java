package com.example.Chat_App.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.Chat_App.model.ChatMessage;

@Controller
public class ChatController {

    // app/send-message
    @MessageMapping("/send-message")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {
        return message;
    }

    @GetMapping("/chat")
    public String chat() {
        return "chat";
    }
}
