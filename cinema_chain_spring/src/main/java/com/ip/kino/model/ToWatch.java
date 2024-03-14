package com.ip.kino.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "DO_OBEJRZENIA")
public class ToWatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long toWatchId;

    @JsonIgnoreProperties("user")
    @ManyToOne
    @JoinColumn(name = "ID_KLIENTA", referencedColumnName = "ID_KLIENTA")
    private Client client;

    @JsonIgnoreProperties("seanse")
    @ManyToOne
    @JoinColumn(name = "ID_FILMU", referencedColumnName = "ID_FILMU")
    private Movie movie;

}
