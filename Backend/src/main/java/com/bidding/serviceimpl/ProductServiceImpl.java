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
import com.bidding.model.Product;
import com.bidding.repository.ProductRepository;
import com.bidding.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public Product createProduct(Product product) {

		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	@Override
	public List<Product> getAllProduct() {

		return productRepository.findAll();
	}

	@Override
	public Product getProductById(String productId) {
		Optional<Product> productDb = this.productRepository.findById(productId);
		if (productDb.isPresent()) {
			return productDb.get();
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + productId);
		}
	}

	@Override
	public List<Product> getSellersProduct(String sellerId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Product> getBuyersProduct(String buyerId) {
		// TODO Auto-generated method stub
		return null;
	}


	
}
