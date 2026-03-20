package com.pecodev.PecoDev.repository;

import com.pecodev.PecoDev.entity.License;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseRepository extends JpaRepository<License, Long> {
    List<License> findByUserEmail(String email);

    // Crucial for the "Double-Spend" protection
    boolean existsByPaddleTransactionId(String paddleTransactionId);
}