package com.ip.kino.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "promocje")
public class Promotion {
    @Id
    @Column(name = "ID_PROMOCJI")
    private Long promotionId;

    @Column(name = "TYTUL")
    private String title;

    @Column(name = "TRESC")
    private String contents;

    @Column(name = "DATA_DODANIA")
    private LocalDate addDate;

    @Column(name = "DATA_WYGASNIECIA")
    private LocalDate expiryDate;

    @Column(name = "OBRAZ_URL")
    private String image;

    @Column(name = "TRESC_DLUGA")
    private String contentsLong;
}
