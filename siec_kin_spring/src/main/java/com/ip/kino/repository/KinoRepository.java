package com.ip.kino.repository;

import com.ip.kino.model.Kino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface KinoRepository extends JpaRepository<Kino, Long> {
    @Query(value = "SELECT k.* FROM KINO k WHERE k.id_kina = :cinemaId", nativeQuery = true)
    Kino getCinemaByCinemaId(Long cinemaId);
}
