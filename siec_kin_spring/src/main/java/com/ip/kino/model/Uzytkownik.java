package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name="uzytkownik")
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
    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnoreProperties("uzytkownik")
    @OneToOne(mappedBy = "uzytkownik")
    private Klient klient;

    //dzieki temu nie ma nieskonczonej petli
    @JsonIgnoreProperties("uzytkownik")
    @OneToOne(mappedBy = "uzytkownik")
    private Administrator administrator;

    @JsonIgnoreProperties("uzytkownik")
    @OneToOne(mappedBy = "uzytkownik")
    private Pracownik pracownik;


    public Uzytkownik(Long id_uzytkownika, String login, String haslo, String email, String imie, String nazwisko, Long nr_telefonu, LocalDate data_utworzenia, Role role, Klient klient) {
        this.id_uzytkownika = id_uzytkownika;
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.nr_telefonu = nr_telefonu;
        this.data_utworzenia = data_utworzenia;
        this.role = role;
        this.klient = klient;
        this.administrator = null;
        this.pracownik = null;
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
