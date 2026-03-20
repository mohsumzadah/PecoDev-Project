package com.pecodev.PecoDev.controller;

import com.pecodev.PecoDev.dto.AuthResponse;
import com.pecodev.PecoDev.dto.LoginRequest;
import com.pecodev.PecoDev.dto.RegisterRequest;
import com.pecodev.PecoDev.entity.User;
import com.pecodev.PecoDev.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}