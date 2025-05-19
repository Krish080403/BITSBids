package com.bidding.serviceimpl;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.bidding.exception.ResourceNotFoundException;
import com.bidding.model.Chat;
import com.bidding.repository.ChatRepository;
import com.bidding.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatRepository chatRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public Chat createChat(Chat chat) {

		return chatRepository.save(chat);
	}

	@Override
	public Chat updateChat(Chat chat) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Chat> getAllChat() {

		return chatRepository.findAll();
	}

	@Override
	public Chat getChatById(String chatId) {
		Optional<Chat> productDb = this.chatRepository.findById(chatId);
		if (productDb.isPresent()) {
			return productDb.get();
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + chatId);
		}
	}

	public List<String> getChattersIds(String userId) {
		Criteria criteria = new Criteria("senderId").is(userId);
		Query query = new Query();
		query.addCriteria(criteria);
		List<String> receiverIds = mongoTemplate.findDistinct(query, "receiverId", Chat.class, String.class);

		criteria = new Criteria("receiverId").is(userId);
		query = new Query();
		query.addCriteria(criteria);
		List<String> senderIds = mongoTemplate.findDistinct(query, "senderId", Chat.class, String.class);

		List<String> chatterIds = new ArrayList<>();
		chatterIds.addAll(receiverIds);
		chatterIds.addAll(senderIds);
		Set<String> set = new LinkedHashSet<>();
		set.addAll(chatterIds);
		chatterIds.clear();

		chatterIds.addAll(set);
		return chatterIds;
	}

	
	public List<Chat> getChattersChat(String userId, String chatterId) {
		Criteria criteria = new Criteria();
		criteria.orOperator(Criteria.where("senderId").is(userId).andOperator(Criteria.where("receiverId").is(chatterId)), 
			    Criteria.where("senderId").is(chatterId).andOperator(Criteria.where("receiverId").is(userId)));
		Query query = new Query();
		query.addCriteria(criteria);
		query.with(Sort.by(Sort.Direction.ASC, "dateTime"));
		List<Chat> chats = mongoTemplate.find(query, Chat.class);

		
		return chats;
		

	}
	
}
