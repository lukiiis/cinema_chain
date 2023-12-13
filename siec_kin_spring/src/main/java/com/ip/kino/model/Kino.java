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
public class Kino {
    @Id
    private int id_kina;
    private String miasto;
    private String ulica;
    private String numer_budynku;
    private String kod_pocztowy;
    private Float budzet;
}
