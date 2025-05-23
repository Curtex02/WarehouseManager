package com.example.demo.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class OrderProductDTO {
    private UUID orderId;
    private Integer productId;
    private Integer productQuantity;
}