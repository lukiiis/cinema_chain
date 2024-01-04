package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SalaDto {
    @Id
    private Long id_sali;
    private Long id_kina;
    private String nazwa;
    private Long ilosc_miejsc;

}
