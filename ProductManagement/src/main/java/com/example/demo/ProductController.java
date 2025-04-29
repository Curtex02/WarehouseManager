package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/inventory")
public class ProductController {//localhost:8080/api/v1/inventory
	@Autowired
	private ProductService productService;
	
	@PostMapping("/products/add")
	public ProductDao addProduct(@RequestBody ProductDao productDao) {
		return productService.addProduct(productDao);
	}
	
	@PutMapping("/products/update/{sku}")
	public ProductDao updateProduct(@PathVariable int sku, @RequestBody ProductDao productDao) {
		return productService.updateProduct(sku, productDao);
	}
	
	@DeleteMapping("/products/{sku}")
	public ProductDao deleteProduct(@PathVariable int sku) {
		return productService.deleteProduct(sku);
	}	
	
	@GetMapping("/products/{sku}")
	public ProductDao getProductDetails(@PathVariable int sku){
		return productService.getProductDetails(sku);
	}
	
	@GetMapping("/alerts")
	public List<InventoryStockDao> getAlerts() {	
		return productService.getAlerts() ;
	}
	
	@PostMapping("/orders/place")
	public String sendOrder(@RequestBody OrderRequestDTO orderRequestDTO) {	
		return productService.sendOrder(orderRequestDTO);
	}
}