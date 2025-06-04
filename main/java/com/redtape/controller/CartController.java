package com.redtape.controller;

import com.redtape.entity.Cart;
import com.redtape.entity.CartItem;
import com.redtape.service.CartService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/getCartByUser/{userId}")
    public ResponseEntity<Cart> getCartByUser(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/createOrUpdateCart")
    public Cart createOrUpdateCart(@RequestBody Cart cart) {
        return cartService.saveOrUpdateCart(cart);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long userId, @RequestBody CartItem item) {
        return ResponseEntity.ok(cartService.addItemToCart(userId, item));
    }

    @PutMapping("/{userId}/items/{itemId}")
    public ResponseEntity<Cart> updateItemQuantity(@PathVariable Long userId, @PathVariable Long itemId, @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(userId, itemId, quantity));
    }

    @DeleteMapping("/{userId}/items/{itemId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long userId, @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(userId, itemId));
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/items")
    public ResponseEntity<List<CartItem>> getAllItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getAllItems(userId));
    }
}
