package com.ip.kino.repository;

import com.ip.kino.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value="SELECT * FROM rezerwacja r WHERE r.id_klienta = :clientId", nativeQuery = true)
    List<Reservation> findReservationsByClientId(Long clientId);

    @Query(value = "SELECT r.* FROM REZERWACJA r INNER JOIN KLIENT k ON(k.id_klienta = r.id_klienta) INNER JOIN UZYTKOWNIK u ON (u.id_uzytkownika = k.id_uzytkownika) WHERE u.login=:login", nativeQuery = true)
    List<Reservation> findReservationsByLogin(String login);

    @Query(value = "SELECT MAX(u.id_rezerwacji) FROM rezerwacja u", nativeQuery = true)
    Long findMaxIdReservation();

    @Query("SELECT k FROM Show k WHERE k.showId = :id")
    Show findShowById(@Param("id") Long id);

    @Query( value ="SELECT k FROM Client k WHERE k.clientId = :id")
    Client findClientById(Long id);
}
