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
public class User implements UserDetails {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_UZYTKOWNIKA")
    private Long userId;

    @Column(name = "LOGIN")
    private String login;

    @Column(name = "HASLO")
    private String passwd;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "IMIE")
    private String name;

    @Column(name = "NAZWISKO")
    private String surname;

    @Column(name = "NR_TELEFONU")
    private Long phone;

    @Column(name = "DATA_UTWORZENIA")
    private LocalDate createDate;

    @Column(name = "BLOKADA")
    private Boolean blockade;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnoreProperties("user")
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private Client client;

    //dzieki temu nie ma nieskonczonej petli
    @JsonIgnoreProperties("user")
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private Admin admin;

    @JsonIgnoreProperties("user")
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private Employee employee;


    public User(Long userId, String login, String passwd, String email, String name, String surname, Long phone, LocalDate createDate, Role role, Client client) {
        this.userId = userId;
        this.login = login;
        this.passwd = passwd;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.createDate = createDate;
        this.role = role;
        this.client = client;
        this.admin = null;
        this.employee = null;
        this.blockade = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return passwd;
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
