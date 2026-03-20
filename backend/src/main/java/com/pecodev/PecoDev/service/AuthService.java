package com.pecodev.PecoDev.service;

import com.pecodev.PecoDev.dto.AuthResponse;
import com.pecodev.PecoDev.dto.LoginRequest;
import com.pecodev.PecoDev.dto.RegisterRequest;
import com.pecodev.PecoDev.entity.User;
import com.pecodev.PecoDev.model.Role; // 1. Import the Enum
import com.pecodev.PecoDev.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        // 2. Convert DTO to Entity using the Enum
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER) // Type-safe assignment
                .build();

        userRepository.save(user);

        // Use the generated token logic
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getUsername(), user.getRole().name(), user.getEmail(),user.getProfilePicture());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail(),  user.getRole().name());
        return new AuthResponse(token, user.getUsername(), user.getRole().name(), user.getEmail(), user.getProfilePicture());
    }
}