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
@AllArgsConstructor
@NoArgsConstructor
public class Seans {
    @Id
    private int id_seansu;
    private int id_filmu;
    private int id_sali;
    private int id_kina;
    private String godzina_rozpoczecia;
    private LocalDate data_seansu;
    private String lektor;
    private String typ_obrazu;

    public int getId_seansu() {
        return id_seansu;
    }

    public void setId_seansu(int id_seansu) {
        this.id_seansu = id_seansu;
    }

    public int getId_filmu() {
        return id_filmu;
    }

    public void setId_filmu(int id_filmu) {
        this.id_filmu = id_filmu;
    }

    public int getId_sali() {
        return id_sali;
    }

    public void setId_sali(int id_sali) {
        this.id_sali = id_sali;
    }

    public int getId_kina() {
        return id_kina;
    }

    public void setId_kina(int id_kina) {
        this.id_kina = id_kina;
    }

    public String getGodzina_rozpoczecia() {
        return godzina_rozpoczecia;
    }

    public void setGodzina_rozpoczecia(String godzina_rozpoczecia) {
        this.godzina_rozpoczecia = godzina_rozpoczecia;
    }

    public LocalDate getData_seansu() {
        return data_seansu;
    }

    public void setData_seansu(LocalDate data_seansu) {
        this.data_seansu = data_seansu;
    }
}
