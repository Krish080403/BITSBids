package com.bidding.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bidding.exception.ResourceNotFoundException;
import com.bidding.model.Bid;
import com.bidding.model.Product;
import com.bidding.repository.BidRepository;
import com.bidding.repository.ProductRepository;
import com.bidding.service.ProductService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/bid")
public class BidController {

	@Autowired
	private BidRepository bidRepository;

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Bid>> getAllBid() {
		return ResponseEntity.ok().body(bidRepository.findAll());
	}

	@PostMapping("/save")
	public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
		bid.setBidDateTime(LocalDateTime.now());
		Product product = productService.getProductById(bid.getProductId());
		product.setHighestBid(bid.getBidPrice());
		productService.updateProduct(product);
		System.out.println(bid.toString());
		return ResponseEntity.ok().body(bidRepository.save(bid));
	}
	@GetMapping("/get/{id}")
    public ResponseEntity < Bid > getBidById(@PathVariable String id) {
		
		Optional<Bid> bidDb = bidRepository.findById(id);
		if (bidDb.isPresent()) {
			return ResponseEntity.ok().body(bidDb.get());
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + id);
		}
    }
}
