package com.redtape.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.redtape.entity.Order;
import com.redtape.entity.OrderStatus;
import com.redtape.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Optional<Order> updateOrderStatus(Long id, OrderStatus status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            return orderRepository.save(order);
        });
    }

    public boolean cancelOrder(Long id) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            return true;
        }).orElse(false);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
