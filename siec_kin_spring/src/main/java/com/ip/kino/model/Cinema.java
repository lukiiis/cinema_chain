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
@Table(name = "Kino")
public class Cinema {
    @Id
    @Column(name = "id_kina")
    private int cinemaId;
    @Column(name = "miasto")
    private String city;
    @Column(name = "ulica")
    private String street;
    @Column(name = "numer_budynku")
    private String building_number;
    @Column(name = "kod_pocztowy")
    private String zip_code;


    @OneToMany
//    @JsonIgnoreProperties("seats")
    @JoinColumn(name = "id_kina")
    private List<ScreeningRoom> screeningRooms;
}
