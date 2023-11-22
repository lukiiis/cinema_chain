package com.ip.kino.model;

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
public class KategoriaFilmu {
    @Id
    private Long id_kategorii;
    private String nazwa_gatunku;
//    @OneToMany(mappedBy = "kategoria", cascade = CascadeType.ALL)
//    @JoinColumn
//    private List<Film> filmy;

    public Long getId_kategorii() {
        return id_kategorii;
    }

    public void setId_kategorii(Long id_kategorii) {
        this.id_kategorii = id_kategorii;
    }

    public String getNazwa_gatunku() {
        return nazwa_gatunku;
    }

    public void setNazwa_gatunku(String nazwa_gatunku) {
        this.nazwa_gatunku = nazwa_gatunku;
    }

//    public List<Film> getFilmy() {
//        return filmy;
//    }
//
//    public void setFilmy(List<Film> filmy) {
//        this.filmy = filmy;
//    }
}
