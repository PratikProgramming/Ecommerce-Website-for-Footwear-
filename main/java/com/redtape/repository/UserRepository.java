package com.redtape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.redtape.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> getUserByEmail(String email);

	User findByEmailAndPassword(String email, String password);

}
