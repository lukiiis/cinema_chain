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
public class MovieDto {
    private String tytul;
    private String opis;
    private String rezyser;
    private String obraz_url;
    private String plakat_url;
    private LocalDate data_premiery;
    private Long czas_trwania;
    private Long id_kategorii;
}
