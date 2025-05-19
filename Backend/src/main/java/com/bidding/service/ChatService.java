package com.bidding.service;

import java.util.List;

import com.bidding.model.Chat;

public interface ChatService {
	public Chat createChat(Chat chat);
	public Chat updateChat(Chat chat);
	public List <Chat> getAllChat();
	public Chat getChatById(String chatId);
    public List <String> getChattersIds(String userId);
    public List<Chat> getChattersChat(String userId, String chatterId);
}
