package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScreeningRoomDto {
    private Long id_sali;
    private Long id_kina;
    private String nazwa;
    private Long ilosc_miejsc;
}
