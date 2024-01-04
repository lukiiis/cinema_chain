package com.ip.kino.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Administrator {
    @Id
    private Long id_administratora;
    @OneToOne
    @JoinColumn(name = "id_uzytkownika")
    private Uzytkownik uzytkownik;

    public Administrator(Long id_administratora, Uzytkownik uzytkownik) {
        this.id_administratora = id_administratora;
        this.uzytkownik = uzytkownik;
    }

    public Administrator(Uzytkownik uzytkownik) {
        this.uzytkownik = uzytkownik;
    }

    public Long getId_administratora() {
        return id_administratora;
    }

    public void setId_administratora(Long id_administratora) {
        this.id_administratora = id_administratora;
    }

    public Uzytkownik getUzytkownik() {
        return uzytkownik;
    }

    public void setUzytkownik(Uzytkownik uzytkownik) {
        this.uzytkownik = uzytkownik;
    }
}
