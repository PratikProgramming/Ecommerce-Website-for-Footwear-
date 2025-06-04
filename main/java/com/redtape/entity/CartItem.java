package com.redtape.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    // Reference to Product using its primary key 'modelNo'
    @ManyToOne
    @JoinColumn(name = "product_model_no", referencedColumnName = "modelNo", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;
}
