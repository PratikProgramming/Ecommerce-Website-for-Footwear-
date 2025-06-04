package com.redtape.controller;

import com.redtape.entity.Category;
import com.redtape.entity.Product;
import com.redtape.entity.SubCategory;
import com.redtape.repository.ProductRepository;
import com.redtape.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Autowired
    private ProductRepository repository;

    // ✅ Get all products
    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ✅ Get product by model number (primary method)
    @GetMapping("/model/{modelNo}")
    public ResponseEntity<Product> getProductByModelNo(@PathVariable Long modelNo) {
        return productService.getProductByModelNo(modelNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create a new product
    @PostMapping("/createProduct")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    // ✅ Create multiple products
    @PostMapping("/createProducts")
    public ResponseEntity<List<Product>> createProducts(@RequestBody List<Product> products) {
        return ResponseEntity.ok(productService.addProducts(products));
    }

    // ✅ Update product
    @PutMapping("/model/{modelNo}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long modelNo, @RequestBody Product product) {
        return productService.updateProduct(modelNo, product)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update product images
    @PutMapping("/model/{modelNo}/images")
    public ResponseEntity<Object> updateProductImages(@PathVariable Long modelNo, @RequestBody Product imagesRequest) {
        return productService.updateProductImages(modelNo, imagesRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete product
    @DeleteMapping("/model/{modelNo}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long modelNo) {
        productService.deleteProduct(modelNo);
        return ResponseEntity.noContent().build();
    }

    // ✅ Search by name
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByName(@RequestParam String name) {
        List<Product> products = productService.searchProductsByName(name);
        return products.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(products);
    }

    // ✅ Filter by category
    @GetMapping("/category")
    public ResponseEntity<List<Product>> getByCategory(@RequestParam Category category) {
        List<Product> products = productService.getProductsByCategory(category);
        return products.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(products);
    }

    // ✅ Filter by subCategory
    @GetMapping("/subCategory")
    public ResponseEntity<List<Product>> getProductsBySubCategory(@RequestParam String subCategory) {
        try {
            SubCategory subCategoryEnum = SubCategory.valueOf(subCategory.toUpperCase());
            List<Product> products = productService.getProductsBySubCategory(subCategoryEnum);
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // ✅ Filter by price range
    @GetMapping("/price-range")
    public ResponseEntity<List<Product>> getByPriceRange(@RequestParam double min, @RequestParam double max) {
        List<Product> products = productService.getProductsByPriceRange(min, max);
        return products.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(products);
    }

    // ✅ Filter by color
    @GetMapping("/color/{color}")
    public ResponseEntity<List<Product>> getByColor(@PathVariable String color) {
        List<Product> products = productService.getProductsByColor(color);
        return products.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(products);
    }

    // ✅ Filter by minimum quantity
    @GetMapping("/min-quantity")
    public ResponseEntity<List<Product>> getByMinimumQuantity(@RequestParam int minQuantity) {
        List<Product> products = productService.getProductsByMinQuantity(minQuantity);
        return products.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(products);
    }

    // ✅ Filter by category and sub-category
    @GetMapping("/catAndSubCat/{cat}/{subCat}")
    public List<Product> getProdbyCatAndSubCat(@PathVariable String cat, @PathVariable String subCat) {
        SubCategory subCate = SubCategory.valueOf(subCat.toUpperCase());
        Category cate = Category.valueOf(cat.toUpperCase());
        return repository.findByCategoryAndSubCategory(cate, subCate);
    }
}
