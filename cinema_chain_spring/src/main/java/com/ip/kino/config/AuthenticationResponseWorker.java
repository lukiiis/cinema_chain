package com.ip.kino.config;

import com.ip.kino.dto.EmployeeDto;
import com.ip.kino.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseWorker extends AuthenticationResponse {
    private EmployeeDto employeeDto;

    public AuthenticationResponseWorker(String status, String token, String name, String lastName, Role role, EmployeeDto employeeDto) {
        super(status, token, name, lastName, role);
        this.employeeDto = employeeDto;
    }
}
