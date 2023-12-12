package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Film {
    @Id
    private Long id_filmu;
    private String tytul;
    private String opis;
    private String rezyser;
    private LocalDate data_premiery;
    private Long czas_trwania;

    //new
    private String obraz_url;
    private String plakat_url;

    @ManyToOne
    @JoinColumn(name = "id_kategorii")
    private KategoriaFilmu kategoria;
}
