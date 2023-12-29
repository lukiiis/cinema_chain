package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "klient")
public class Client {
    @Id
    @Column(name = "ID_KLIENTA")
    private Long clientId;

    @Column(name = "LICZBA_REZERWACJI")
    private Long reservationCount;

    @Column(name = "PORTFEL")
    private Double wallet;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_uzytkownika", referencedColumnName = "id_uzytkownika")
    private User user;

    public Client(Long reservationCount, Double wallet, User user) {
        this.reservationCount = reservationCount;
        this.wallet = wallet;
        this.user = user;
    }
}
