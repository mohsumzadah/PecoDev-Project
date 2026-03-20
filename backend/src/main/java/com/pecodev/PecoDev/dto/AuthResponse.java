package com.pecodev.PecoDev.dto;

import com.pecodev.PecoDev.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username; // Nice to send this so React can say "Welcome, [Name]"
    private String role;
    private String email;

    private String profilePicture;
}