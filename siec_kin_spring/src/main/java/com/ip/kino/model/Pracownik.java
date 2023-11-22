package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Pracownik {
    @Id
    private Long id_pracownika;
    private String stanowisko;
    @OneToOne
    @JoinColumn(name = "id_uzytkownika")
    private Uzytkownik uzytkownik;
    @ManyToOne
    @JoinColumn(name = "id_kina")
    private Kino kino;

    public Pracownik(Long id_pracownika, String stanowisko, Uzytkownik uzytkownik, Kino kino) {
        this.id_pracownika = id_pracownika;
        this.stanowisko = stanowisko;
        this.uzytkownik = uzytkownik;
        this.kino = kino;
    }

    public Pracownik(String stanowisko, Uzytkownik uzytkownik, Kino kino) {
        this.stanowisko = stanowisko;
        this.uzytkownik = uzytkownik;
        this.kino = kino;
    }

    public Long getId_pracownika() {
        return id_pracownika;
    }

    public void setId_pracownika(Long id_pracownika) {
        this.id_pracownika = id_pracownika;
    }

    public String getStanowisko() {
        return stanowisko;
    }

    public void setStanowisko(String stanowisko) {
        this.stanowisko = stanowisko;
    }

    public Uzytkownik getUzytkownik() {
        return uzytkownik;
    }

    public void setUzytkownik(Uzytkownik uzytkownik) {
        this.uzytkownik = uzytkownik;
    }

    public Kino getKino() {
        return kino;
    }

    public void setKino(Kino kino) {
        this.kino = kino;
    }
}
