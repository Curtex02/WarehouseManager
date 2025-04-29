package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stockapi")
public class InventoryStockController {

    @Autowired
    private InventoryStockService inventoryStockService;

    @GetMapping("/all")
    public List<InventoryStockDao> getAllStock() {
        return inventoryStockService.getAllInventoryStock();
    }
    @GetMapping("/sku/{sku}")
    public InventoryStockDao getStockBySku(@PathVariable int sku) {
        return inventoryStockService.getInventoryStockBySku(sku);
    }
    @PostMapping("/add")
    public InventoryStockDao addStock(@RequestBody InventoryStockDao inventoryStockDao) {
        return inventoryStockService.addInventoryStock(inventoryStockDao);
    }
    @PutMapping("/sku/{sku}")
    public InventoryStockDao updateStockBySku(@PathVariable int sku, @RequestBody InventoryStockDao inventoryStockDao) {
        return inventoryStockService.updateInventoryStockBySku(sku, inventoryStockDao);
    }
    @DeleteMapping("/sku/{sku}")
    public InventoryStockDao deleteStockBySku(@PathVariable int sku) {
        return inventoryStockService.deleteInventoryStockBySku(sku);
    }
    @PostMapping("/decrease/sku/{sku}")
    public InventoryStockDao decreaseStockBySku(@PathVariable int sku, @RequestBody int quantity) {
        return inventoryStockService.decreaseQuantityBySku(sku, quantity);
    }
    @PostMapping("/increase/sku/{sku}")
    public InventoryStockDao increaseStockBySku(@PathVariable int sku, @RequestBody int quantity) {
        return inventoryStockService.increaseQuantityBySku(sku, quantity);
    }
    @GetMapping("/alerts")
    public List<InventoryStockDao> getLowStockAlerts() {
    	return inventoryStockService.getLowStockAlerts();
    }


}