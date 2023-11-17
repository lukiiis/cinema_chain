package com.ip.kino.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Zapowiedz {
    @Id
    private long id_zapowiedzi;
    private long id_filmu;
    private String tytul_zapowiedzi;
    private String opis_zapowiedzi;
    private String obraz_url;

    public Zapowiedz(long id_filmu, String tytul_zapowiedzi, String opis_zapowiedzi, String obraz_url) {
        this.id_filmu = id_filmu;
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

    public long getId_filmu() {
        return id_filmu;
    }

    public void setId_filmu(long id_filmu) {
        this.id_filmu = id_filmu;
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
