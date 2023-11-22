package com.ip.kino.dto;

import com.ip.kino.model.Kino;
import com.ip.kino.model.Uzytkownik;

public class PracownikDTO {
    private Uzytkownik uzytkownik;
    private Kino kino;
    private String stanowisko;

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

    public String getStanowisko() {
        return stanowisko;
    }

    public void setStanowisko(String stanowisko) {
        this.stanowisko = stanowisko;
    }
}
