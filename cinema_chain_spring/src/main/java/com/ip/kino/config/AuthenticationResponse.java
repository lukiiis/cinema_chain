package com.ip.kino.config;

import com.ip.kino.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    protected String status;
    protected String token;
    protected String name;
    protected String lastName;
    protected Role role;

    public AuthenticationResponse(String status) {
        this.status = status;
    }
}
