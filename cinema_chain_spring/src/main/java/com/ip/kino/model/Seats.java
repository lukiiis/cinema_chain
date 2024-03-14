package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Miejsca")
public class Seats {
    @Id
    @Column(name = "id_miejsca")
    private Long seatId;
    @Column(name = "rzad")
    private String row;
    @Column(name = "numer")
    private Long number;



    @ManyToOne
    @JoinColumn(name="id_sali", referencedColumnName = "id_sali")
    private ScreeningRoom screeningRoom;
}