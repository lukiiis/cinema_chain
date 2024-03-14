package com.ip.kino.repository;

import com.ip.kino.model.Movie;
import com.ip.kino.model.Cinema;
import com.ip.kino.model.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {

    @Query(value = "SELECT s.* FROM Seans s WHERE s.id_kina = :kinoId AND s.id_filmu = :filmId ORDER BY s.data_seansu ASC, s.godzina_rozpoczecia ASC", nativeQuery = true)
    List<Show> findAllByCinemaAndMovie(Long kinoId, Long filmId);

    @Query(value = "select s.* from Seans s where s.id_kina = :kinoId ORDER BY s.data_seansu ASC, s.godzina_rozpoczecia ASC", nativeQuery = true)
    List<Show> findAllByCinemaId(Long kinoId);

    @Query(value = "SELECT s.* FROM Seans s WHERE s.id_kina = :kinoId AND s.id_sali = :salaId and s.data_seansu = TO_DATE(:data, 'YY/MM/DD')", nativeQuery = true)
    List<Show> findAllByDataCinemaScreeningRoom(Long kinoId, Long salaId, LocalDate data);

    @Query(value = "SELECT MAX(u.id_seansu) FROM seans u", nativeQuery = true)
    Long findMaxShowId();

    @Query("SELECT k FROM Movie k WHERE k.movieId = :id")
    Movie findMovieById(@Param("id") Long id);

    @Query("SELECT k FROM Cinema k WHERE k.cinemaId = :id")
    Cinema findCinemaById(@Param("id") Long id);
}
