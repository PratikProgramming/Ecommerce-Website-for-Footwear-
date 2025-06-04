package com.redtape.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

// import com.redtape.entity.Role;
import com.redtape.entity.User;
import com.redtape.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {
//    	user.setRole(Role.ADMIN);
        return userService.createUser(user);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/getUserByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.getUserById(id)
            .map(user -> {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                // If password is being updated, encode it
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    user.setPassword(userService.encodePassword(updatedUser.getPassword()));
                }
                user.setRole(updatedUser.getRole());
                User savedUser = userService.createUser(user);
                return ResponseEntity.ok(savedUser);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(user -> {
                userService.deleteUserById(id);
                return ResponseEntity.noContent().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/changePassword/{id}")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody String newPassword) {
        return userService.getUserById(id)
            .map(user -> {
                user.setPassword(userService.encodePassword(newPassword));
                userService.saveUser(user);
                return ResponseEntity.ok("Password updated successfully");
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userService.getUserByEmail(loginRequest.getEmail())
            .map(user -> {
                if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    return ResponseEntity.ok(new LoginResponse(user.getEmail(), user.getRole()));
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials");
                }
            })
            .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }
    
    @GetMapping("/username")
    public ResponseEntity<String> getUsernameByEmail(@RequestParam String email) {
        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get().getName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    @GetMapping("/role")
    public ResponseEntity<String> getRoleByEmail(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(u -> ResponseEntity.ok(u.getRole().name()))
                   .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Role not found"));
    }
}
