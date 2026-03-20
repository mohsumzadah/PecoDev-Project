package com.pecodev.PecoDev.repository;

import com.pecodev.PecoDev.model.Category;
import com.pecodev.PecoDev.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring creates this query automatically!
    List<Product> findByCategory(Category category);
    Page<Product> findByCategory(Category category, Pageable pageable);
}