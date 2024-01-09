package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterEmployeeDto {
    private String login;
    private String passwd;
    private String email;
    private String name;
    private String surname;
    private Long phone;
    private String position;
    private Long cinemaId;
}
