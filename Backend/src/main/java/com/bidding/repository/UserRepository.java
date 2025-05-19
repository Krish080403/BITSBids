package com.bidding.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.bidding.model.User;

public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByEmail(String id);

}
