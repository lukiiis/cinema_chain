package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Klient {
    @Id
    private Long id_klienta;
    private Long liczba_rezerwacji;
    private Double portfel;

    @OneToOne
    @JoinColumn(name = "id_uzytkownika")
    private Uzytkownik uzytkownik;

    public Klient(Long id_klienta, Long liczba_rezerwacji, Double portfel, Uzytkownik uzytkownik) {
        this.id_klienta = id_klienta;
        this.liczba_rezerwacji = liczba_rezerwacji;
        this.portfel = portfel;
        this.uzytkownik = uzytkownik;
    }

    public Klient(Long liczba_rezerwacji, Double portfel, Uzytkownik uzytkownik) {
        this.liczba_rezerwacji = liczba_rezerwacji;
        this.portfel = portfel;
        this.uzytkownik = uzytkownik;
    }

    public Long getLiczba_rezerwacji() {
        return liczba_rezerwacji;
    }

    public void setLiczba_rezerwacji(Long liczba_rezerwacji) {
        this.liczba_rezerwacji = liczba_rezerwacji;
    }

    public Double getPortfel() {
        return portfel;
    }

    public void setPortfel(Double portfel) {
        this.portfel = portfel;
    }

    public Uzytkownik getUzytkownik() {
        return uzytkownik;
    }

    public void setUzytkownik(Uzytkownik uzytkownik) {
        this.uzytkownik = uzytkownik;
    }
}
