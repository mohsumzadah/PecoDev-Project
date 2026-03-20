package com.pecodev.PecoDev.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pecodev.PecoDev.model.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "licenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class License {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String licenseKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private LocalDateTime purchaseDate;

    private boolean isActive;

    @Column(unique = true) // This is the shield!
    private String paddleTransactionId;

    @PrePersist
    protected void onCreate() {
        this.purchaseDate = LocalDateTime.now();
        this.isActive = true;

        // Generates the unique PecoDev key format
        if (this.licenseKey == null) {
            String fullUuid = UUID.randomUUID().toString().replace("-", "").toUpperCase();

            // Take 12 characters and split them into 4-4-4
            String part1 = fullUuid.substring(0, 4);
            String part2 = fullUuid.substring(4, 8);
            String part3 = fullUuid.substring(8, 12);

            this.licenseKey = String.format("PECO-%s-%s-%s", part1, part2, part3);
        }
    }
}
