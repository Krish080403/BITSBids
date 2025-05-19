package com.bidding.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.bidding.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
	Optional<Product> findById(String id);
	List<Product> findByNameLike(String key);

}
