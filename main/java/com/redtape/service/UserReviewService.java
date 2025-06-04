package com.redtape.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.redtape.entity.UserReview;
import com.redtape.repository.UserReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserReviewService {

    private final UserReviewRepository reviewRepository;

    /**
     * Fetch all reviews for a specific product.
     * 
     * @param productId the product's modelNo (ID)
     * @return List of UserReview
     */
    public List<UserReview> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProduct_ModelNo(productId);
    }

    /**
     * Fetch paginated reviews for a specific product.
     * 
     * @param productId the product's modelNo (ID)
     * @param pageable pagination and sorting information
     * @return Page of UserReview
     */
    public Page<UserReview> getReviewsForProduct(Long productId, Pageable pageable) {
        return reviewRepository.findByProduct_ModelNo(productId, pageable);
    }

    /**
     * Add a new user review.
     * 
     * @param review the UserReview entity
     * @return saved UserReview entity
     */
    public UserReview addReview(UserReview review) {
        return reviewRepository.save(review);
    }
}
