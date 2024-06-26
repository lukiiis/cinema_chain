package com.ip.kino.config;

import com.ip.kino.dto.ClientDto;
import com.ip.kino.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseClient extends AuthenticationResponse{
    private ClientDto client_data;

    public AuthenticationResponseClient(String status, String token, String name, String lastName, Role role, ClientDto client_data) {
        super(status, token, name, lastName, role);
        this.client_data = client_data;
    }
}
