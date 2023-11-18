package com.ip.kino.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Zapowiedzi {
    @Id
    private Long id_zapowiedzi;
    private String tytul_zapowiedzi;
    private String opis_zapowiedzi;
    private String obraz_url;
    @OneToOne
    @JoinColumn(name = "id_filmu")
    private Film film;

    public Zapowiedzi(Film film, String tytul_zapowiedzi, String opis_zapowiedzi, String obraz_url) {
        this.film = film;
        this.tytul_zapowiedzi = tytul_zapowiedzi;
        this.opis_zapowiedzi = opis_zapowiedzi;
        this.obraz_url = obraz_url;
    }

    public long getId_zapowiedzi() {
        return id_zapowiedzi;
    }

    public void setId_zapowiedzi(long id_zapowiedzi) {
        this.id_zapowiedzi = id_zapowiedzi;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    public String getTytul_zapowiedzi() {
        return tytul_zapowiedzi;
    }

    public void setTytul_zapowiedzi(String tytul_zapowiedzi) {
        this.tytul_zapowiedzi = tytul_zapowiedzi;
    }

    public String getOpis_zapowiedzi() {
        return opis_zapowiedzi;
    }

    public void setOpis_zapowiedzi(String opis_zapowiedzi) {
        this.opis_zapowiedzi = opis_zapowiedzi;
    }

    public String getObraz_url() {
        return obraz_url;
    }

    public void setObraz_url(String obraz_url) {
        this.obraz_url = obraz_url;
    }
}
