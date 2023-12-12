package com.ip.kino.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bilet")
public class Ticket {
    @Id
    @Column(name = "ID_BILETU")
    private Long ticketId;

    @Column(name = "typ_biletu")
    private String ticketType;

    @Column(name = "cena")
    private Double price;
}
