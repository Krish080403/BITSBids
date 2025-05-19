package com.bidding.service;

import java.util.List;

import com.bidding.model.Product;

public interface ProductService {
	public Product createProduct(Product product);
	public Product updateProduct(Product product);
	public List <Product> getAllProduct();
	public Product getProductById(String productId);
    public List<Product> getSellersProduct(String sellerId);
    public List<Product> getBuyersProduct(String buyerId);
    
}
