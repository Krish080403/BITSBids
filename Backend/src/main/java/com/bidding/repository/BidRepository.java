package com.bidding.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bidding.model.Bid;

public interface BidRepository extends MongoRepository<Bid, String> {

}
