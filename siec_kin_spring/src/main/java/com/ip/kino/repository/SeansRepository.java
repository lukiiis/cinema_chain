package com.ip.kino.repository;

import com.ip.kino.model.Seans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeansRepository extends JpaRepository<Seans, Long> {

    @Query(value = "SELECT s.* FROM Seans s WHERE s.id_kina = :kinoId AND s.id_filmu = :filmId ORDER BY s.data_seansu ASC, s.godzina_rozpoczecia ASC", nativeQuery = true)
    List<Seans> findAllByKinoAndFilm(Long kinoId, Long filmId);

    @Query(value = "select s.* from Seans s where s.id_kina = :kinoId ORDER BY s.data_seansu ASC, s.godzina_rozpoczecia ASC", nativeQuery = true)
    List<Seans> findAllByIdKIna(Long kinoId);
}
