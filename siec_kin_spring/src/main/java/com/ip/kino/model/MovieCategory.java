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
//    @OneToMany(mappedBy = "kategoria", cascade = CascadeType.ALL)
//    @JoinColumn
//    private List<Film> filmy;

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long id_kategorii) {
        this.categoryId = id_kategorii;
    }

    public String getMovie_genre() {
        return movie_genre;
    }

    public void setMovie_genre(String nazwa_gatunku) {
        this.movie_genre = nazwa_gatunku;
    }

//    public List<Film> getFilmy() {
//        return filmy;
//    }
//
//    public void setFilmy(List<Film> filmy) {
//        this.filmy = filmy;
//    }
}
