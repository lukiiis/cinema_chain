package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Uzytkownik")
public class Uzytkownik implements UserDetails {
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
    @Enumerated(EnumType.STRING)
    private Role role;
    //----------------------------DANE KLIENTA---------------------------------------------
    private Long liczba_rezerwacji;
    private Double portfel;

    //--------------------------DANE PRACOWNIKA--------------------------------------------
    private String stanowisko;
    @ManyToOne
    @JoinColumn(name = "id_kina")
    private Kino kino;


    public Uzytkownik(String login, String haslo, String email, String imie, String nazwisko, Long nr_telefonu, LocalDate data_utworzenia, Long typ_konta, Role role) {
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.nr_telefonu = nr_telefonu;
        this.data_utworzenia = data_utworzenia;
        this.typ_konta = typ_konta;
        this.role = role;
        this.liczba_rezerwacji=0L;
        this.portfel=0.0;
        this.stanowisko="";
        this.kino=null;
    }

    public Uzytkownik(Long id, String login, String haslo, String email, String imie, String nazwisko, Long nr_telefonu, LocalDate data_utworzenia, Long typ_konta, Role role) {
        this.id_uzytkownika=id;
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.nr_telefonu = nr_telefonu;
        this.data_utworzenia = data_utworzenia;
        this.typ_konta = typ_konta;
        this.role = role;
        this.liczba_rezerwacji=0L;
        this.portfel=0.0;
        this.stanowisko="";
        this.kino=null;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return haslo;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
