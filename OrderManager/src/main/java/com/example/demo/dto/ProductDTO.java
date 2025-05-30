package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDTO {
    private Integer productId;
    private String productName;
    private Integer productQuantity;
}