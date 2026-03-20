package com.pecodev.PecoDev.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pecodev.PecoDev.model.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRequest {

    private long id;

    private String email;
    private String username;
    private String password;
    private String role;
    private String profilePicture;
    private boolean removeImage;
}
