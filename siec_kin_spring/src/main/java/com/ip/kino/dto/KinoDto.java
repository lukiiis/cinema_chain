package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KinoDto {
    @Id
    private int id_kina;
    private String miasto;
    private String ulica;
    private String numer_budynku;
    private String kod_pocztowy;
    private Float budzet;

}
