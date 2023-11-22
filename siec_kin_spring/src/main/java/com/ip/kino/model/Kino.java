package com.ip.kino.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Kino {
    @Id
    private int id_kina;
    private String miasto;
    private String ulica;
    private String numer_budynku;
    private String kod_pocztowy;
    private Float budzet;


    public int getId_kina() {
        return id_kina;
    }

    public void setId_kina(int id_kina) {
        this.id_kina = id_kina;
    }

    public String getMiasto() {
        return miasto;
    }

    public void setMiasto(String miasto) {
        this.miasto = miasto;
    }

    public String getUlica() {
        return ulica;
    }

    public void setUlica(String ulica) {
        this.ulica = ulica;
    }

    public String getNumer_budynku() {
        return numer_budynku;
    }

    public void setNumer_budynku(String numer_budynku) {
        this.numer_budynku = numer_budynku;
    }

    public String getKod_pocztowy() {
        return kod_pocztowy;
    }

    public void setKod_pocztowy(String kod_pocztowy) {
        this.kod_pocztowy = kod_pocztowy;
    }

    public Float getBudzet() {
        return budzet;
    }

    public void setBudzet(Float budzet) {
        this.budzet = budzet;
    }
}
