package com.pecodev.PecoDev.service;


import com.pecodev.PecoDev.dto.UserRequest;
import com.pecodev.PecoDev.entity.User;
import com.pecodev.PecoDev.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Use a specific folder for profiles
    private final String UPLOAD_DIR = "uploads/profiles/";

    @Transactional
    public void updateUserSettings(String email, MultipartFile imageFile, UserRequest dto) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        // 1. Handle Password Update
        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        // 2. Handle Profile Picture Logic
        // Priority 1: Check if the user explicitly wants to remove the photo
        if (dto.isRemoveImage()) {
            deletePhysicalFile(user.getProfilePicture());
            user.setProfilePicture(null);
        }
        // Priority 2: Check if a new file was uploaded
        else if (imageFile != null && !imageFile.isEmpty()) {
            // Delete old file if it exists to keep storage clean
            deletePhysicalFile(user.getProfilePicture());
            // Save and set the new path
            user.setProfilePicture(saveImage(imageFile));
        }

        userRepository.save(user);
    }

    // --- Private Helper Methods (Copied from ProductService logic) ---

    private String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        // Consistent naming convention
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return path starting with / so frontend can serve it
        return "/" + UPLOAD_DIR + fileName;
    }

    private void deletePhysicalFile(String imagePath) throws IOException {
        if (imagePath != null && imagePath.startsWith("/uploads/")) {
            // substring(1) removes the leading "/" to find the file in project root
            Path path = Paths.get(imagePath.substring(1));
            Files.deleteIfExists(path);
        }
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}