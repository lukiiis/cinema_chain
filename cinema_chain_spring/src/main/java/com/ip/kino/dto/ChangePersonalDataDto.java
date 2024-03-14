package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePersonalDataDto {
    private Long id;
    private String name;
    private String surname;
    private Long phone;
}
