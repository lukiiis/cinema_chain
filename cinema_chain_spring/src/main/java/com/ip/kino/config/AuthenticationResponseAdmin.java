package com.ip.kino.config;

import com.ip.kino.dto.AdminDto;
import com.ip.kino.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseAdmin extends AuthenticationResponse {
    private AdminDto adminDto;

    public AuthenticationResponseAdmin(String status, String token, String name, String lastName, Role role, AdminDto adminDto) {
        super(status, token, name, lastName, role);
        this.adminDto = adminDto;
    }
}
