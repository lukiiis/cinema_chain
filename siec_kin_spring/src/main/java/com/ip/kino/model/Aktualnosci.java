package com.ip.kino.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Aktualnosci {
    @Id
    private Long id_aktualnosci;
    private String tytul;
    private String tresc;
    private LocalDate data_dodania;
    private String obraz_url;
    private String obraz_url_baner;
    private String tresc_dluga;

    public Aktualnosci(Long id_aktualnosci, String tytul, String tresc, LocalDate data_dodania, String obraz_url, String obraz_url_baner, String tresc_dluga) {
        this.id_aktualnosci = id_aktualnosci;
        this.tytul = tytul;
        this.tresc = tresc;
        this.data_dodania = data_dodania;
        this.obraz_url = obraz_url;
        this.obraz_url_baner = obraz_url_baner;
        this.tresc_dluga = tresc_dluga;
    }

    public String getObraz_url_baner() {
        return obraz_url_baner;
    }

    public void setObraz_url_baner(String obraz_url_baner) {
        this.obraz_url_baner = obraz_url_baner;
    }

    public String getTresc_dluga() {
        return tresc_dluga;
    }

    public void setTresc_dluga(String tresc_dluga) {
        this.tresc_dluga = tresc_dluga;
    }

    public Long getId_aktualnosci() {
        return id_aktualnosci;
    }

    public void setId_aktualnosci(Long id_aktualnosci) {
        this.id_aktualnosci = id_aktualnosci;
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

    public String getObraz_url() {
        return obraz_url;
    }

    public void setObraz_url(String obraz_url) {
        this.obraz_url = obraz_url;
    }

}
