package com.redtape.controller;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.redtape.entity.UserReview;
import com.redtape.service.UserReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class UserReviewController {

    private final UserReviewService reviewService;

    @GetMapping("/product/{productId}")
    public List<UserReview> getReviewsForProduct(@PathVariable Long productId) {
        return reviewService.getReviewsForProduct(productId);
    }

    @PostMapping("/addReview")
    public UserReview addReview(@Valid @RequestBody UserReview review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/product/{productId}/paged")
    public Page<UserReview> getReviewsForProductPage(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewService.getReviewsForProduct(productId, pageable);
    }
}
