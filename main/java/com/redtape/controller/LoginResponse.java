package com.redtape.controller;

import com.redtape.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
	private String email;
    private Role role;
}
