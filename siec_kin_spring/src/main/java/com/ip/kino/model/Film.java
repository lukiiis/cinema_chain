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

    public String getObraz_url() {
        return obraz_url;
    }

    public void setObraz_url(String obraz_url) {
        this.obraz_url = obraz_url;
    }

    public String getPlakat_url() {
        return plakat_url;
    }

    public void setPlakat_url(String plakat_url) {
        this.plakat_url = plakat_url;
    }

    public Long getId_filmu() {
        return id_filmu;
    }

    public void setId_filmu(Long id_filmu) {
        this.id_filmu = id_filmu;
    }

    public String getTytul() {
        return tytul;
    }

    public void setTytul(String tytul) {
        this.tytul = tytul;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getRezyser() {
        return rezyser;
    }

    public void setRezyser(String rezyser) {
        this.rezyser = rezyser;
    }

    public LocalDate getData_premiery() {
        return data_premiery;
    }

    public void setData_premiery(LocalDate data_premiery) {
        this.data_premiery = data_premiery;
    }

    public Long getCzas_trwania() {
        return czas_trwania;
    }

    public void setCzas_trwania(Long czas_trwania) {
        this.czas_trwania = czas_trwania;
    }



}
