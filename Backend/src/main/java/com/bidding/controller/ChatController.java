package com.bidding.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bidding.model.Chat;
import com.bidding.service.ChatService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

	@Autowired
	private ChatService chatService;

	@GetMapping("/all")
	public ResponseEntity<List<Chat>> getAllChat() {
		return ResponseEntity.ok().body(chatService.getAllChat());
	}

	@PostMapping("/save")
	public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
		chat.setDateTime(LocalDateTime.now());
		System.out.println(chat.toString());
		return ResponseEntity.ok().body(this.chatService.createChat(chat));
	}
	@GetMapping("/chat/{id}")
    public ResponseEntity < Chat > getChatById(@PathVariable String id) {
        return ResponseEntity.ok().body(chatService.getChatById(id));
    }
	@GetMapping("/chatters/{userId}")
    public ResponseEntity <List<String>> getChatters(@PathVariable String userId) {
		System.out.println(userId);
        return ResponseEntity.ok().body(chatService.getChattersIds(userId));
    }
	
	@GetMapping("/chattersChat/{userId}/{chatterId}")
    public ResponseEntity <List<Chat>> getChattersChat(@PathVariable String userId, @PathVariable String chatterId) {
		System.out.println(userId+"  "+chatterId);
        return ResponseEntity.ok().body(chatService.getChattersChat(userId, chatterId));
    }
}
