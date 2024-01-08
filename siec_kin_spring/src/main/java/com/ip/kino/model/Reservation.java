package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "rezerwacja")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_REZERWACJI")
    private Long reservationId;

    @Column(name = "IMIE")
    private String firstName;

    @Column(name = "NAZWISKO")
    private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "NR_TELEFONU")
    private Long phoneNumber;

    @Column(name = "NR_MIEJSCA")
    private Long seatNumber;

    @Column(name = "RZAD_MIEJSCA")
    private String seatRow;

    @Column(name = "DATA_ZAKUPU")
    private LocalDate purchaseDate;

    @Column(name = "TYP_BILETU")
    private String ticketType;

    @Column(name = "CENA")
    private Double price;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ID_KLIENTA", referencedColumnName = "ID_KLIENTA")
    private Client client;

    //@JsonIgnoreProperties("film")
    @ManyToOne
    @JoinColumn(name = "ID_SEANSU", referencedColumnName = "ID_SEANSU")
    private Show session;

    public Reservation(String firstName, String lastName, String email, Long phoneNumber, Long seatNumber, String seatRow, LocalDate purchaseDate, String ticketType, Double price, Client client, Show session) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.seatNumber = seatNumber;
        this.seatRow = seatRow;
        this.purchaseDate = purchaseDate;
        this.ticketType = ticketType;
        this.price = price;
        this.client = client;
        this.session = session;
    }
}
