package com.pecodev.PecoDev.service;

import com.pecodev.PecoDev.dto.ProductRequest;
import com.pecodev.PecoDev.model.Product;
import com.pecodev.PecoDev.model.Category;
import com.pecodev.PecoDev.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private final String UPLOAD_DIR = "uploads/products/";

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<Product> getProductsByCategory(String categoryName) {
        try {
            Category category = Category.valueOf(categoryName.toUpperCase());
            return productRepository.findByCategory(category);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    public Product createProduct(ProductRequest dto, MultipartFile imageFile) throws IOException {
        // Handle File saving logic inside Service
        String imagePath = saveImage(imageFile);

        Product product = Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .shortDesc(dto.getShortDesc())
                .longDesc(dto.getLongDesc())
                .img(imagePath)
                .category(dto.getCategory())
                .features(dto.getFeatures())
                .createdDate(LocalDate.now())
                .paddlePriceId(dto.getPaddlePriceId())
                .build();

        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, ProductRequest dto, MultipartFile imageFile) throws IOException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(dto.getName());
        existingProduct.setPrice(dto.getPrice());
        existingProduct.setCategory(dto.getCategory());
        existingProduct.setShortDesc(dto.getShortDesc());
        existingProduct.setPaddlePriceId(dto.getPaddlePriceId());
        existingProduct.setLongDesc(dto.getLongDesc());
        existingProduct.setFeatures(dto.getFeatures());

        if (imageFile != null && !imageFile.isEmpty()) {
            // Delete old file
            deletePhysicalFile(existingProduct.getImg());
            // Save new file
            existingProduct.setImg(saveImage(imageFile));
        }

        return productRepository.save(existingProduct);
    }

    @Transactional
    public void deleteProduct(Long id) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        deletePhysicalFile(product.getImg());
        productRepository.delete(product);
    }

    // --- Private Helper Methods to keep logic DRY ---

    private String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/" + UPLOAD_DIR + fileName;
    }

    private void deletePhysicalFile(String imagePath) throws IOException {
        if (imagePath != null && imagePath.startsWith("/uploads/")) {
            // substring(1) removes the leading "/" so it's a relative path to your project root
            Path path = Paths.get(imagePath.substring(1));
            Files.deleteIfExists(path);
        }
    }
}