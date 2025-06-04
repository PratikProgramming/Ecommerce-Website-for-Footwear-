package com.redtape.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Who placed the order
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Items in this order
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    // Total price of the order
    @Column(nullable = false)
    private double totalAmount;

    // Order timestamp
    @Column(nullable = false)
    private LocalDateTime orderDate;

    // Order status (e.g., PENDING, SHIPPED, DELIVERED, CANCELLED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDateTime.now();
        this.status = OrderStatus.PENDING;
    }
}
