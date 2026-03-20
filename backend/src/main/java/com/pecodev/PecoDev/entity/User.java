package com.pecodev.PecoDev.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pecodev.PecoDev.model.Role; // Import your Enum
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String username;
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING) // This ensures "ROLE_USER" is saved in the DB
    private Role role;

    @Column
    private String profilePicture;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<License> licenses;
}