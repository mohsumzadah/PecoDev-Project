package com.pecodev.PecoDev.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenseRequest {
    private Long id;
    private String licenseKey;
    private Long productId;
    private List<Long> productIds;
    private String productName;
    private String productImg;
    private String category;
    private String version;
    private String filePath;
}