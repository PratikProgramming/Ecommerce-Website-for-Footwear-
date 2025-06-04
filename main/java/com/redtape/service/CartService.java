package com.redtape.service;

import com.redtape.entity.Cart;
import com.redtape.entity.CartItem;
import com.redtape.entity.Product;
import com.redtape.entity.User;
import com.redtape.repository.CartRepository;
import com.redtape.repository.ProductRepository;
import com.redtape.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public Optional<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart saveOrUpdateCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart addItemToCart(Long userId, CartItem item) {
        if (item.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        // Get or create cart for user
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setTotalAmount(0.0);
                    return newCart;
                });

        // Ensure the product exists
        Product product = productRepository.findById(item.getProduct().getModelNo())
                .orElseThrow(() -> new RuntimeException("Product not found with modelNo: " + item.getProduct().getModelNo()));

        item.setProduct(product);
        item.setCart(cart);
        item.setPrice(product.getPrice() * item.getQuantity());

        cart.getItems().add(item);
        cart.setTotalAmount(cart.getTotalAmount() + item.getPrice());

        return cartRepository.save(cart);
    }

    public Cart updateItemQuantity(Long userId, Long itemId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        for (CartItem item : cart.getItems()) {
            if (item.getId().equals(itemId)) {
                // Adjust total before and after update
                cart.setTotalAmount(cart.getTotalAmount() - item.getPrice());
                item.setQuantity(quantity);
                item.setPrice(item.getProduct().getPrice() * quantity);
                cart.setTotalAmount(cart.getTotalAmount() + item.getPrice());
                break;
            }
        }

        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        cart.getItems().removeIf(item -> {
            if (item.getId().equals(itemId)) {
                cart.setTotalAmount(cart.getTotalAmount() - item.getPrice());
                return true;
            }
            return false;
        });

        return cartRepository.save(cart);
    }

    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        cart.getItems().clear();
        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }

    public List<CartItem> getAllItems(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
        return cart.getItems();
    }
}
