package com.redtape.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Belongs to one order
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // Reference to the Product via modelNo (instead of product_id)
    @ManyToOne
    @JoinColumn(name = "product_model_no", referencedColumnName = "modelNo", nullable = false)
    private Product product;

    // Quantity of the product in the order
    @Column(nullable = false)
    private int quantity;

    // Price at the time of ordering (in case it changes later)
    @Column(nullable = false)
    private double price;
}
