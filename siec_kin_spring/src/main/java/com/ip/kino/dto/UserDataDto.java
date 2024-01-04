package com.ip.kino.dto;

import com.ip.kino.model.Administrator;
import com.ip.kino.model.Klient;
import com.ip.kino.model.Pracownik;
import com.ip.kino.model.Role;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class UserDataDto {
    private Long id_uzytkownika;
    private String login;
    private String email;
    private String imie;
    private String nazwisko;
    private Long nr_telefonu;
    private LocalDate data_utworzenia;
    private Role role;
    private KlientDto klient;
    private AdminDto administrator;
    private PracownikDto pracownik;
}
