package com.pecodev.PecoDev.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pecodev.PecoDev.model.Category;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true) // This tells Jackson: "If you see a field you don't recognize (like id), just skip it."
public class ProductRequest {
    private Long id;
    private String name;
    private Double price;
    private String paddlePriceId;
    private String description;
    private String shortDesc;
    private String longDesc;
    private String img;
    private Category category;
    private List<String> features;
}