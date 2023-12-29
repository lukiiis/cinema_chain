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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "aktualnosci")
public class News {
    @Id
    @Column(name = "ID_AKTUALNOSCI")
    private Long newsId;

    @Column(name = "TYTUL")
    private String title;

    @Column(name = "TRESC")
    private String contents;

    @Column(name = "DATA_DODANIA")
    private LocalDate addDate;

    @Column(name = "OBRAZ_URL")
    private String image;

    @Column(name = "OBRAZ_URL_BANER")
    private String banner;

    @Column(name = "TRESC_DLUGA")
    private String contentsLong;
}
