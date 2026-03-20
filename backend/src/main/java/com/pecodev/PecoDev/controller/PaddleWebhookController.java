package com.pecodev.PecoDev.controller;

import com.pecodev.PecoDev.dto.PaddleWebhookRequest;
import com.pecodev.PecoDev.entity.User;
import com.pecodev.PecoDev.repository.UserRepository;
import com.pecodev.PecoDev.service.LicenseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j; // 1. Import Slf4j
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/webhooks")
@AllArgsConstructor
@Slf4j // 2. Add annotation
public class PaddleWebhookController {
    private final LicenseService licenseService;
    private final UserRepository userRepository;

    @PostMapping("/paddle")
    public ResponseEntity<String> handlePaddleWebhook(@RequestBody PaddleWebhookRequest payload) {
        String eventType = payload.getEventType();
        log.info("Received Paddle webhook event: {}", eventType);

        if ("transaction.completed".equals(eventType)) {
            var data = payload.getData();
            var customData = data.getCustomData();

            if (customData == null) {
                log.warn("Transaction {} received but customData is missing.", data.getId());
                return ResponseEntity.badRequest().body("Missing custom data");
            }

            try {
                Long userId = Long.parseLong(customData.get("userId").toString());
                String productIdsRaw = customData.get("productIds").toString();
                List<Long> productIds = Arrays.stream(productIdsRaw.split(","))
                        .map(Long::parseLong).toList();

                String transactionId = data.getId();

                log.info("Processing transaction {} for User ID: {} and Products: {}",
                        transactionId, userId, productIds);

                User user = userRepository.findById(userId)
                        .orElseThrow(() -> {
                            log.error("Webhook processing failed: User {} not found", userId);
                            return new RuntimeException("User not found");
                        });

                licenseService.issueLicenses(user.getEmail(), productIds, transactionId);

                log.info("Successfully issued licenses for transaction: {}", transactionId);

            } catch (Exception e) {
                log.error("Error processing Paddle webhook for transaction {}: {}",
                        data.getId(), e.getMessage());
                return ResponseEntity.internalServerError().body("Error processing webhook");
            }
        } else {
            log.debug("Skipping unhandled event type: {}", eventType);
        }

        return ResponseEntity.ok("Handled");
    }
}