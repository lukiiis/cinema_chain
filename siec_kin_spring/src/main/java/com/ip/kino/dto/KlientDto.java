package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KlientDto {
    private Long id_klienta;
    private Long liczba_rezerwacji;
    private Double portfel;
}
