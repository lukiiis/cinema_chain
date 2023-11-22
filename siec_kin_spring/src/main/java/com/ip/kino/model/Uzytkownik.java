package com.ip.kino.model;

import jakarta.persistence.*;
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
public class Uzytkownik {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_uzytkownika;
    private String login;
    private String haslo;
    private String email;
    private String imie;
    private String nazwisko;
    private Long nr_telefonu;
    private LocalDate data_utworzenia;
    private Long typ_konta;
    @OneToOne(mappedBy = "uzytkownik")
    private Klient klient;
    @OneToOne(mappedBy = "uzytkownik")
    private Administrator administrator;
    @OneToOne(mappedBy = "uzytkownik")
    private Pracownik pracownik;

    //konstruktor klienta
    public Uzytkownik(String login, String haslo, String email, String imie, String nazwisko, Long nr_telefonu, LocalDate data_utworzenia, Long typ_konta, Klient klient) {
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.nr_telefonu = nr_telefonu;
        this.data_utworzenia = data_utworzenia;
        this.typ_konta = typ_konta;
        this.klient = klient;
        this.administrator=null;
        this.pracownik=null;
    }

    //konstruktor pracownika
    public Uzytkownik(String login, String haslo, String email, String imie, String nazwisko, Long nr_telefonu, LocalDate data_utworzenia, Long typ_konta, Pracownik pracownik) {
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.nr_telefonu = nr_telefonu;
        this.data_utworzenia = data_utworzenia;
        this.typ_konta = typ_konta;
        this.klient = null;
        this.administrator=null;
        this.pracownik=pracownik;
    }

    //konstruktor administratora
    public Uzytkownik(String login, String haslo, String email, String imie, String nazwisko, Long nr_telefonu, LocalDate data_utworzenia, Long typ_konta, Administrator administrator) {
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.nr_telefonu = nr_telefonu;
        this.data_utworzenia = data_utworzenia;
        this.typ_konta = typ_konta;
        this.klient = null;
        this.administrator=administrator;
        this.pracownik=null;
    }

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

    public LocalDate getData_utworzenia() {
        return data_utworzenia;
    }

    public void setData_utworzenia(LocalDate data_utworzenia) {
        this.data_utworzenia = data_utworzenia;
    }

    public Long getTyp_konta() {
        return typ_konta;
    }

    public void setTyp_konta(Long typ_konta) {
        this.typ_konta = typ_konta;
    }
}
