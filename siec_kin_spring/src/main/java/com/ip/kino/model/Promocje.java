package com.ip.kino.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
public class Promocje {
    @Id
    private Long id_promocji;
    private String tytul;
    private String tresc;
    private LocalDate data_dodania;
    private LocalDate data_wygasniecia;
    private String obraz_url;
    private String tresc_dluga;

    public Promocje(Long id_promocji, String tytul, String tresc, LocalDate data_dodania, LocalDate data_wygasniecia, String obraz_url, String tresc_dluga) {
        this.id_promocji = id_promocji;
        this.tytul = tytul;
        this.tresc = tresc;
        this.data_dodania = data_dodania;
        this.data_wygasniecia = data_wygasniecia;
        this.obraz_url = obraz_url;
        this.tresc_dluga = tresc_dluga;
    }

    public String getTresc_dluga() {
        return tresc_dluga;
    }

    public void setTresc_dluga(String tresc_dluga) {
        this.tresc_dluga = tresc_dluga;
    }

    public Long getId_promocji() {
        return id_promocji;
    }

    public void setId_promocji(Long id_promocji) {
        this.id_promocji = id_promocji;
    }

    public String getTytul() {
        return tytul;
    }

    public void setTytul(String tytul) {
        this.tytul = tytul;
    }

    public String getTresc() {
        return tresc;
    }

    public void setTresc(String tresc) {
        this.tresc = tresc;
    }

    public LocalDate getData_dodania() {
        return data_dodania;
    }

    public void setData_dodania(LocalDate data_dodania) {
        this.data_dodania = data_dodania;
    }

    public LocalDate getData_wygasniecia() {
        return data_wygasniecia;
    }

    public void setData_wygasniecia(LocalDate data_wygasniecia) {
        this.data_wygasniecia = data_wygasniecia;
    }

    public String getObraz_url() {
        return obraz_url;
    }

    public void setObraz_url(String obraz_url) {
        this.obraz_url = obraz_url;
    }
}
