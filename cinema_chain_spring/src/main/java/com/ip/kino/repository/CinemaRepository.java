package com.ip.kino.repository;

import com.ip.kino.model.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {

    @Query(value = "SELECT k.* FROM KINO k WHERE k.id_kina = :cinemaId", nativeQuery = true)
    Cinema getCinemaByCinemaId(Long cinemaId);
}
