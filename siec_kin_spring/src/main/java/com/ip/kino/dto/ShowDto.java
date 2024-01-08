package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShowDto {
    private String godzina_rozpoczecia;
    private LocalDate data_seansu;
    private Long id_sali;
    private Long id_kina;
    private Long id_filmu;
    private String lektor;
    private String typ_obrazu;
}
