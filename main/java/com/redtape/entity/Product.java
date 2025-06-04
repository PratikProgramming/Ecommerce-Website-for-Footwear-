package com.redtape.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long modelNo; // unique model number instead of ID

    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(length = 30)
    private String color;
    
    @Column(nullable = false)
    private double price;
    
    @Column(nullable = false)
    private int quantity; // replaces 'size'

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private SubCategory subCategory;
    
    @Column(length = 255)
    private String description;
    
    @Column(length = 900)
    private String img1;
    @Column(length = 900)
    private String img2;
    @Column(length = 900)
    private String img3;
    @Column(length = 900)
    private String img4;
    @Column(length = 900)
    private String img5;
}
