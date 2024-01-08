package com.ip.kino.model;

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
@Table(name = "pracownik")
public class Employee {
    @Id
    @Column(name = "ID_PRACOWNIKA")
    private Long employeeId;

    @Column(name = "STANOWISKO")
    private String position;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_uzytkownika", referencedColumnName = "id_uzytkownika")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_kina", referencedColumnName = "id_kina")
    private Cinema cinema;

    public Employee(String position, User user, Cinema kino) {
        this.position = position;
        this.user = user;
        this.cinema = kino;
    }
}
