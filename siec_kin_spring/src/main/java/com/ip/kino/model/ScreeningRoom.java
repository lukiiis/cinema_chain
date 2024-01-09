package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sala")
public class ScreeningRoom {
    @Id
    @Column(name = "id_sali")
    private Long screeningRoomId;
    @Column(name = "id_kina")
    private Long cinemaId;
    @Column(name = "nazwa")
    private String name;
    @Column(name = "ilosc_miejsc")
    private Long numberOfSeats;

    @JsonIgnoreProperties("screeningRoom")
    @OneToMany
    @JoinColumn(name = "id_sali")
    private List<Seats> seats;
}