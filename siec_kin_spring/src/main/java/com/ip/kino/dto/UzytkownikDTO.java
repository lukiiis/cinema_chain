package com.ip.kino.dto;

public class UzytkownikDTO {
    private String login;
    private String haslo;
    private String email;
    private String imie;
    private String nazwisko;
    private Long nr_telefonu;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getHaslo() {
        return haslo;
    }

    public void setHaslo(String haslo) {
        this.haslo = haslo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public Long getNr_telefonu() {
        return nr_telefonu;
    }

    public void setNr_telefonu(Long nr_telefonu) {
        this.nr_telefonu = nr_telefonu;
    }
}
