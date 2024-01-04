package com.ip.kino.repository;

import com.ip.kino.model.Film;
import com.ip.kino.model.Reservation;
import com.ip.kino.model.Seans;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ip.kino.model.Sala;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface SalaRepository extends JpaRepository<Sala, Long> {

    @Query("SELECT k FROM Sala k WHERE k.id_sali = :id")
    Sala findSalaById(@Param("id") Long id);
}
