package com.redtape.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "name",length = 15)
	private String name;
	
	@Column(name = "email",length = 25, nullable = false, unique = true)
    private String email;
	
	@Column(length = 15)
	private String mobile;
	
	@Column(name = "password",length = 255)
    private String password;

	@Column(length = 10)
	private String gender;

	@Enumerated(EnumType.STRING)
    @Column
    private Role role;
}
