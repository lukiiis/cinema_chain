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
@Table(name = "administrator")
public class Admin {
    @Id
    @Column(name = "ID_ADMINISTRATORA")
    private Long adminId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_uzytkownika", referencedColumnName = "id_uzytkownika")
    private User user;
}
