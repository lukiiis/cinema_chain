package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private Integer seatNumber;

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
    @JoinColumn(name = "ID_KLIENTA", referencedColumnName = "ID_KLIENTA", insertable = false, updatable = false)
    private Klient client;
    //@JsonIgnoreProperties("film")
    @ManyToOne
    @JoinColumn(name = "ID_SEANSU", referencedColumnName = "ID_SEANSU", insertable = false, updatable = false)
    private Seans session;

//    @ManyToOne
//    @JoinColumn(name = "ID_BILETU", referencedColumnName = "ID_BILETU", insertable = false, updatable = false)
//    private Ticket ticket;
}
