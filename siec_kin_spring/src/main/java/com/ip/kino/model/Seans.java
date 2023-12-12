package com.ip.kino.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Seans {
    @Id
    private int id_seansu;
    //todo przerobić to na private Sala sala, jak już będzie takie entity
    private int id_sali;
    private String godzina_rozpoczecia;
    private LocalDate data_seansu;
    private String lektor;
    private String typ_obrazu;
    @ManyToOne
    @JoinColumn(name="id_filmu", referencedColumnName = "id_filmu")
    private Film film;
    @ManyToOne
    @JoinColumn(name="id_kina", referencedColumnName = "id_kina")
    private Kino kino;
}
