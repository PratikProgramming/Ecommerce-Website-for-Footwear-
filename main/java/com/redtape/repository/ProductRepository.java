package com.redtape.repository;

import com.redtape.entity.Category;
import com.redtape.entity.Product;
import com.redtape.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    // 1. Search by name (case-insensitive, partial match)
    List<Product> findByNameContainingIgnoreCase(String name);

    // 2. Filter by category
    List<Product> findByCategory(Category category);

    // 3. Filter by subcategory
    List<Product> findBySubCategory(SubCategory subCategory);

    // 4. Filter by price range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    // 5. Filter by color
    List<Product> findByColorIgnoreCase(String color);

    // 6. Filter by minimum quantity in stock
    List<Product> findByQuantityGreaterThanEqual(int quantity);
    
    List<Product> findByCategoryAndSubCategory(Category category, SubCategory subCategory);



    // --- Custom JPQL Queries ---

    // 7. Combined filters using JPQL
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:subCategory IS NULL OR p.subCategory = :subCategory) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:color IS NULL OR LOWER(p.color) = LOWER(:color)) AND " +
           "(:minQuantity IS NULL OR p.quantity >= :minQuantity)")
    List<Product> searchProducts(
            @Param("category") Category category,
            @Param("subCategory") SubCategory subCategory,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("color") String color,
            @Param("minQuantity") Integer minQuantity
    );

    // 8. Paginated version of the above
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:subCategory IS NULL OR p.subCategory = :subCategory) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:color IS NULL OR LOWER(p.color) = LOWER(:color)) AND " +
           "(:minQuantity IS NULL OR p.quantity >= :minQuantity)")
    Page<Product> searchProductsPaginated(
            @Param("category") Category category,
            @Param("subCategory") SubCategory subCategory,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("color") String color,
            @Param("minQuantity") Integer minQuantity,
            Pageable pageable
    );
    
}
