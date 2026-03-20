package com.pecodev.PecoDev.service;

import com.pecodev.PecoDev.dto.LicenseRequest;
import com.pecodev.PecoDev.entity.License;
import com.pecodev.PecoDev.entity.User;
import com.pecodev.PecoDev.model.Product;
import com.pecodev.PecoDev.repository.LicenseRepository;
import com.pecodev.PecoDev.repository.ProductRepository;
import com.pecodev.PecoDev.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LicenseService {

    private final LicenseRepository licenseRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // Fetch all licenses for a specific user email
    public List<LicenseRequest> getMyLicenses(String email) {
        List<License> licenses = licenseRepository.findByUserEmail(email);
        return licenses.stream().map(license -> LicenseRequest.builder()
                .id(license.getId())
                .licenseKey(license.getLicenseKey())
                .productId(license.getProduct().getId())
                .productName(license.getProduct().getName())
                .productImg(license.getProduct().getImg())
                .category(license.getProduct().getCategory().toString())
                .build()).toList();
    }
    @Transactional
    public void issueLicenses(String userEmail, List<Long> productIds, String transactionId) {
        // 1. Safety Check: Don't process the same payment twice
        if (transactionId != null && licenseRepository.existsByPaddleTransactionId(transactionId)) {
            System.out.println("Payment " + transactionId + " already processed. Skipping.");
            return;
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with EMAIL: " + userEmail));

        for (Long productId : productIds) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found ID: " + productId));

            License license = License.builder()
                    .user(user)
                    .product(product)
                    .paddleTransactionId(transactionId)
                    .isActive(true)
                    .build(); // Entity's @PrePersist handles the PECO- key!

            licenseRepository.save(license);
        }
    }
}