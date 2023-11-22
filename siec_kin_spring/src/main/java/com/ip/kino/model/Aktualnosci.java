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
@AllArgsConstructor
public class Aktualnosci {
    @Id
    private Long id_aktualnosci;
    private String tytul;
    private String tresc;
    private LocalDate data_dodania;
    private String obraz_url;

    public Aktualnosci(String tytul, String tresc, LocalDate data_dodania, String obraz_url) {
        this.tytul = tytul;
        this.tresc = tresc;
        this.data_dodania = data_dodania;
        this.obraz_url = obraz_url;
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
