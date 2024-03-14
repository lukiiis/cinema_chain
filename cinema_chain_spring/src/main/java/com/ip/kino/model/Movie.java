package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Film")
public class Movie {
    @Id
    @Column(name = "id_filmu")
    private Long movieId;
    @Column(name = "tytul")
    private String title;
    @Column(name = "opis")
    private String description;
    @Column(name = "rezyser")
    private String director;
    @Column(name = "obraz_url")
    private String picture_url;
    @Column(name = "plakat_url")
    private String poster_url;
    @Column(name = "data_premiery")
    private LocalDate release_date;
    @Column(name = "czas_trwania")
    private Long duration;




    @OneToMany(mappedBy = "movie")
    private List<Show> shows;


    @ManyToOne
    @JoinColumn(name = "id_kategorii")
    private MovieCategory category;

    public Movie(Long movieId, String tytul, String opis, String rezyser, String obraz_url, String plakat_url, LocalDate data_premiery, Long czas_trwania, MovieCategory kategoria) {
        this.movieId = movieId;
        this.title = tytul;
        this.description = opis;
        this.director = rezyser;
        this.picture_url = obraz_url;
        this.poster_url = plakat_url;
        this.release_date = data_premiery;
        this.duration = czas_trwania;
        this.category = kategoria;
    }

}
