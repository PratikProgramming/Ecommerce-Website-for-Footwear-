package com.redtape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.redtape.entity.UserReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserReviewRepository extends JpaRepository<UserReview, Long> {

    // Use productModelNo instead of productId, and match the field name from UserReview entity
    List<UserReview> findByProduct_ModelNo(Long modelNo);

    Page<UserReview> findByProduct_ModelNo(Long modelNo, Pageable pageable);
}
