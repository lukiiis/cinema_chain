package com.ip.kino.config;

import com.ip.kino.dto.KlientDto;
import com.ip.kino.model.Administrator;
import com.ip.kino.model.Klient;
import com.ip.kino.model.Pracownik;
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
}
