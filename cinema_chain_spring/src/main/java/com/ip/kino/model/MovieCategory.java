package com.ip.kino.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Kategoria_Filmu")
public class MovieCategory {
    @Id
    @Column(name = "id_kategorii")
    private Long categoryId;
    @Column(name = "nazwa_gatunku")
    private String movie_genre;
}
