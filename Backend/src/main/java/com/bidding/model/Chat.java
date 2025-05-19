package com.bidding.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "chat")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Chat {
	@Id
    private String id;
	private String senderId;
	private String receiverId;
	private String productId;
	private String message;
	private LocalDateTime dateTime;
}
