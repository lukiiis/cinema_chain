package com.ip.kino.dto;

import com.ip.kino.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDataDto {
    private Long userId;
    private String login;
    private String email;
    private String name;
    private String surname;
    private Long phone;
    private LocalDate createDate;
    private Role role;
    private ClientDto client;
    private AdminDto admin;
    private EmployeeDto employee;
}
