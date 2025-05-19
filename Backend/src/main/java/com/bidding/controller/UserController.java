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
import com.bidding.model.User;
import com.bidding.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	
	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.ok().body(userRepository.findAll());
	}

	@PostMapping("/save")
	public ResponseEntity<User> createUser(@RequestBody User user) {

		return ResponseEntity.ok().body(userRepository.save(user));
	}
	@GetMapping("/get/{id}")
    public ResponseEntity < User > getUserById(@PathVariable String id) {
		
		Optional<User> userDb = userRepository.findByEmail(id);
		if (userDb.isPresent()) {
			
			return ResponseEntity.ok().body(userDb.get());
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + id);
		}
    }
}
