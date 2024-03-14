package com.ip.kino.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Seans")
public class Show {
    @Id
    @Column(name = "id_seansu")
    private Long showId;
    @Column(name = "godzina_rozpoczecia")
    private String startTime;
    @Column(name = "data_seansu")
    private LocalDate showDate;
    @Column(name = "lektor")
    private String lector;
    @Column(name = "typ_obrazu")
    private String movieFormat;
    @Column(name = "id_sali")
    private Long screeningRoomId;

    @JsonIgnoreProperties("shows")
    @ManyToOne
    @JoinColumn(name="id_filmu", referencedColumnName = "id_filmu")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name="id_kina", referencedColumnName = "id_kina")
    private Cinema cinema;



    public Show(Long id_seansu, String godzina_rozpoczecia, LocalDate data_seansu, String lektor, String typ_obrazu, Long id_sali, Movie film, Cinema kino) {
        this.showId = id_seansu;
        this.startTime = godzina_rozpoczecia;
        this.showDate = data_seansu;
        this.lector = lektor;
        this.movieFormat = typ_obrazu;
        this.screeningRoomId = id_sali;
        this.movie = film;
        this.cinema = kino;
    }
}
