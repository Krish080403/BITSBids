package com.bidding.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bidding.model.Product;
import com.bidding.repository.ProductRepository;
import com.bidding.service.ProductService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> getAllProduct() {
		
		List<Product> products = productService.getAllProduct();
		System.out.println(products);
		return ResponseEntity.ok().body(products);
	}

	@PostMapping("/add")
	public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
		System.out.println(product.toString());
		if (bindingResult.hasErrors()) {
			bindingResult.getFieldErrors()
					.forEach(f -> System.out.println(f.getField() + ": " + f.getDefaultMessage()));

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cause description here");
		}

		product.setPostedDateTime(LocalDateTime.now());
		
		return ResponseEntity.ok().body(this.productService.createProduct(product));
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable String id) {
		return ResponseEntity.ok().body(productService.getProductById(id));
	}

	@GetMapping("/sellersProduct/{sellerId}")
	public ResponseEntity<List<Product>> getSellersProduct(@PathVariable String sellerId) {
		System.out.println(sellerId);
		return ResponseEntity.ok().body(productService.getSellersProduct(sellerId));
	}

	@GetMapping("/buyersProduct/{buyerId}")
	public ResponseEntity<List<Product>> getBuyersProduct(@PathVariable String buyerId) {
		System.out.println(buyerId);
		return ResponseEntity.ok().body(productService.getBuyersProduct(buyerId));
	}
	
	@GetMapping("/search/{key}")
	public ResponseEntity<List<Product>> searchProductByKey(@PathVariable String key) {
		return ResponseEntity.ok().body(productRepository.findByNameLike(key));
	}
}
