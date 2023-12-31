package com.ip.kino.repository;

import com.ip.kino.model.Film;
import com.ip.kino.model.KategoriaFilmu;
import com.ip.kino.model.Kino;
import com.ip.kino.model.Seans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SeansRepository extends JpaRepository<Seans, Long> {

    @Query(value = "SELECT s.* FROM Seans s WHERE s.id_kina = :kinoId AND s.id_filmu = :filmId ORDER BY s.data_seansu ASC, s.godzina_rozpoczecia ASC", nativeQuery = true)
    List<Seans> findAllByKinoAndFilm(Long kinoId, Long filmId);

    @Query(value = "select s.* from Seans s where s.id_kina = :kinoId ORDER BY s.data_seansu ASC, s.godzina_rozpoczecia ASC", nativeQuery = true)
    List<Seans> findAllByIdKIna(Long kinoId);

    @Query(value = "SELECT s.* FROM Seans s WHERE s.id_kina = :kinoId AND s.id_sali = :salaId and s.data_seansu = TO_DATE(:data, 'YY/MM/DD')", nativeQuery = true)
    List<Seans> findAllByDataKinoSala(Long kinoId, Long salaId, LocalDate data);

    @Query(value = "SELECT MAX(u.id_seansu) FROM seans u", nativeQuery = true)
    Long findMaxIdSeansu();

    @Query("SELECT k FROM Film k WHERE k.id_filmu = :id")
    Film findFilmById(@Param("id") Long id);

    @Query("SELECT k FROM Kino k WHERE k.id_kina = :id")
    Kino findKinoById(@Param("id") Long id);
}
