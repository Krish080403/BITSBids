package com.bidding.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Document(collection="bid")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Bid {
	@Id
	private String id;
	private String bidderId;
	private String productId;
	private Integer bidPrice;
	private LocalDateTime bidDateTime;
	
	
}
