package com.ip.kino.dto;

import com.ip.kino.model.Kino;
import com.ip.kino.model.Uzytkownik;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PracownikDto {
    private Long id_pracownika;
    private Kino kino;
    private String stanowisko;
}
