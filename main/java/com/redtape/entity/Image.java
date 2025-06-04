package com.redtape.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_model_no", referencedColumnName = "modelNo")
    private Product product;
}
