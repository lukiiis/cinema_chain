package com.ip.kino.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Zapowiedzi {
    @Id
    private long id_zapowiedzi;
    private long id_filmu;
    private String tytul_zapowiedzi;
    private String opis_zapowiedzi;
    private String obraz_url;
}
