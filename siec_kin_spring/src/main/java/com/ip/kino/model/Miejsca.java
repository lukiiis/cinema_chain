package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Miejsca {
    @Id
    private Long id_miejsca;
    private String rzad;
    private Long numer;


    @JsonIgnoreProperties("miejsca")
    @ManyToOne
    @JoinColumn(name="id_sali", referencedColumnName = "id_sali")
    private Sala sala;
}
