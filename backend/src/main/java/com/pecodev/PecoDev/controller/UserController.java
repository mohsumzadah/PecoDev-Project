package com.pecodev.PecoDev.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pecodev.PecoDev.dto.UserRequest;
import com.pecodev.PecoDev.entity.User;
import com.pecodev.PecoDev.repository.UserRepository;
import com.pecodev.PecoDev.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Controller
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PutMapping(value = "/settings", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateSettings(
            Principal principal, // Securely injected by Spring
            @RequestPart("settings") String settingsJson,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        // Translate HTTP JSON string to Java Object
        ObjectMapper mapper = new ObjectMapper();
        UserRequest dto = mapper.readValue(settingsJson, UserRequest.class);

        // Hand off the clean data to the Service
        userService.updateUserSettings(principal.getName(), image, dto);

        return ResponseEntity.ok("Settings updated successfully!");
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        // principal.getName() is the email injected from your JWT
        User user = userService.getUserByEmail(principal.getName());
        return ResponseEntity.ok(user);
    }
}
