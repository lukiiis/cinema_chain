package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

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
    private String obraz_url;
    private String plakat_url;
    private LocalDate data_premiery;
    private Long czas_trwania;

    @ManyToOne
    @JoinColumn(name = "id_kategorii")
    private KategoriaFilmu kategoria;

    @OneToMany
    @JoinColumn(name = "id_seansu")
    private List<Seans> seanse;

}
