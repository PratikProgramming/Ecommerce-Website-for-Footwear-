package com.redtape.service;

import com.redtape.entity.Category;
import com.redtape.entity.Product;
import com.redtape.entity.SubCategory;
import com.redtape.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // ===================== Create or Update =====================

    public Product addProduct(Product product) {
        validateProduct(product);
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(Long modelNo, Product updatedProduct) {
        validateProduct(updatedProduct);

        return productRepository.findById(modelNo).map(existingProduct -> {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setSubCategory(updatedProduct.getSubCategory());
            existingProduct.setColor(updatedProduct.getColor());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setImg1(updatedProduct.getImg1());
            existingProduct.setImg2(updatedProduct.getImg2());
            existingProduct.setImg3(updatedProduct.getImg3());
            existingProduct.setImg4(updatedProduct.getImg4());
            existingProduct.setImg5(updatedProduct.getImg5());
            return productRepository.save(existingProduct);
        });
    }

    // ===================== Read =====================

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductByModelNo(Long modelNo) {
        return productRepository.findById(modelNo);
    }

    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getProductsByCategory(Category category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getProductsBySubCategory(SubCategory subCategory) {
        return productRepository.findBySubCategory(subCategory);
    }

    public List<Product> getProductsByColor(String color) {
        return productRepository.findByColorIgnoreCase(color);
    }

    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        if (minPrice > maxPrice) {
            throw new IllegalArgumentException("Minimum price cannot be greater than maximum price.");
        }
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public List<Product> getProductsByMinQuantity(int minQuantity) {
        return productRepository.findByQuantityGreaterThanEqual(minQuantity);
    }

    // ===================== Delete =====================

    public void deleteProduct(Long modelNo) {
        if (!productRepository.existsById(modelNo)) {
            throw new RuntimeException("Product not found with modelNo: " + modelNo);
        }
        productRepository.deleteById(modelNo);
    }

    // ===================== Validation =====================

    private void validateProduct(Product product) {
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name must not be empty.");
        }
        if (product.getPrice() < 0) {
            throw new IllegalArgumentException("Product price cannot be negative.");
        }
        if (product.getQuantity() < 0) {
            throw new IllegalArgumentException("Product quantity cannot be negative.");
        }
    }

	public List<Product> addProducts(List<Product> products) {
		return productRepository.saveAll(products);
	}

	public Optional<Object> updateProductImages(Long modelNo, Product request) {
		 return productRepository.findById(modelNo).map(product -> {
		        product.setImg1(request.getImg1());
		        product.setImg2(request.getImg2());
		        product.setImg3(request.getImg3());
		        product.setImg4(request.getImg4());
		        product.setImg5(request.getImg5());
		        return productRepository.save(product);
		    });
	}
}
