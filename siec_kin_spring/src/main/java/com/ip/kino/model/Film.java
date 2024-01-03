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

    @OneToMany(mappedBy = "film")
    private List<Seans> seanse;

    @ManyToOne
    @JoinColumn(name = "id_kategorii")
    private KategoriaFilmu kategoria;

    public Film(Long id_filmu, String tytul, String opis, String rezyser, String obraz_url, String plakat_url, LocalDate data_premiery, Long czas_trwania, KategoriaFilmu kategoria) {
        this.id_filmu = id_filmu;
        this.tytul = tytul;
        this.opis = opis;
        this.rezyser = rezyser;
        this.obraz_url = obraz_url;
        this.plakat_url = plakat_url;
        this.data_premiery = data_premiery;
        this.czas_trwania = czas_trwania;
        this.kategoria = kategoria;
    }

}
