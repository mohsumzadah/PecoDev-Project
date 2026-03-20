package com.pecodev.PecoDev.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pecodev.PecoDev.entity.License;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;



    private String paddlePriceId;

    @Column(length = 500)
    private String description;

    private String shortDesc;

    @Column(columnDefinition = "TEXT") // Allows for very long descriptions
    private String longDesc;

    private String img;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "product_features", // The name of the hidden table
            joinColumns = @JoinColumn(name = "product_id") // The FK pointing to your main entity
    )
    private List<String> features;

    private LocalDate createdDate;

    @Enumerated(EnumType.STRING) // Saves as "FIVEM" or "MINECRAFT" in DB
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<License> licenses;

}