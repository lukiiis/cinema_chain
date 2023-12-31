package com.ip.kino.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Sala {
    @Id
    private Long id_sali;
    private Long id_kina;
    private String nazwa;
    private Long ilosc_miejsc;
}
