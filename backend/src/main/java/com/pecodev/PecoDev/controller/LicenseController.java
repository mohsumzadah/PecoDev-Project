package com.pecodev.PecoDev.controller;

import com.pecodev.PecoDev.dto.LicenseRequest;
import com.pecodev.PecoDev.entity.License;
import com.pecodev.PecoDev.service.LicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor
public class LicenseController {

    private final LicenseService licenseService;

    // Matches: getMyLicenses()
    @GetMapping("/my-licenses")
    public ResponseEntity<List<LicenseRequest>> getMyLicenses(Principal principal) {
        return ResponseEntity.ok(licenseService.getMyLicenses(principal.getName()));
    }

    @PostMapping("/issue")
    public ResponseEntity<String> issue(@RequestBody LicenseRequest request, Principal principal) {
        // We pass a unique manual ID so the existsByPaddleTransactionId check doesn't block future manual adds
        String manualId = "MANUAL-" + UUID.randomUUID().toString().substring(0, 8);

        licenseService.issueLicenses(principal.getName(), request.getProductIds(), manualId);
        return ResponseEntity.ok("Licenses issued successfully");
    }
}