package com.redtape.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.redtape.entity.Role;
import com.redtape.entity.User;
import com.redtape.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService 
{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
    	if (user.getRole() == null) {
            user.setRole(Role.USER);  // Set default role here
        }
    	if (userRepository.getUserByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
    	user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    public Optional<User> getUserByEmail(String email)
    {
    	return userRepository.getUserByEmail(email);
    }

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    
    public User getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
