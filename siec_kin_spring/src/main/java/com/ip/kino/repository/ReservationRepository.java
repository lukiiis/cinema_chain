package com.ip.kino.repository;

import com.ip.kino.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value="SELECT * FROM rezerwacja r WHERE r.id_klienta = :clientId", nativeQuery = true)
    List<Reservation> findReservationsByClientId(Long clientId);

    @Query(value = "SELECT r.* FROM REZERWACJA r INNER JOIN KLIENT k ON(k.id_klienta = r.id_klienta) INNER JOIN UZYTKOWNIK u ON (u.id_uzytkownika = k.id_uzytkownika) WHERE u.login=:login", nativeQuery = true)
    List<Reservation> findReservationsByLogin(String login);
}
