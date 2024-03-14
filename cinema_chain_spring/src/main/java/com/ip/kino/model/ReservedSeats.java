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
@Table(name = "Miejsca_zarezerwowane")
public class ReservedSeats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_miejsca_zarezerwowanego")
    private Long reserved_seatId;
    @Column(name = "id_miejsca")
    private Long seatId;
    @Column(name = "id_rezerwacji")
    private Long reservationId;
    @Column(name = "id_seansu")
    private Long showId;

    public ReservedSeats(Long id_miejsca, Long id_rezerwacji, Long id_seansu) {
        this.seatId = id_miejsca;
        this.reservationId = id_rezerwacji;
        this.showId = id_seansu;
    }
}