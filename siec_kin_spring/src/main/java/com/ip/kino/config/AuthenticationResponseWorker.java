package com.ip.kino.config;

import com.ip.kino.dto.PracownikDto;
import com.ip.kino.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseWorker extends AuthenticationResponse {
    private PracownikDto pracownikDto;

    public AuthenticationResponseWorker(String status, String token, String name, String lastName, Role role, PracownikDto pracownikDto) {
        super(status, token, name, lastName, role);
        this.pracownikDto = pracownikDto;
    }
}
