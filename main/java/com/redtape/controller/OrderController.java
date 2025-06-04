package com.redtape.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.redtape.entity.Order;
import com.redtape.entity.OrderStatus;
import com.redtape.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return orderService.updateOrderStatus(id, status)
                .map(updatedOrder -> ResponseEntity.ok().body(updatedOrder))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long id) {
        boolean cancelled = orderService.cancelOrder(id);
        return cancelled ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
