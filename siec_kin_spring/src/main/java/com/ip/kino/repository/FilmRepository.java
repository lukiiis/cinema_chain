package com.ip.kino.repository;

import com.ip.kino.model.Film;
import com.ip.kino.model.KategoriaFilmu;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {
    @Query(value="SELECT * FROM film f WHERE f.data_premiery > CURRENT_DATE", nativeQuery = true)
    List<Film> findZapowiedzi();

    @Query(value = "SELECT MAX(u.id_filmu) FROM film u", nativeQuery = true)
    Long findMaxIdFilmu();

    @Query("SELECT k FROM KategoriaFilmu k WHERE k.id_kategorii = :id")
    KategoriaFilmu findKategoriaById(@Param("id") Long id);

    @Query(value = "SELECT f.* FROM FILM f WHERE f.id_filmu = :movieId", nativeQuery = true)
    Optional<Film> findMovieByMovieId(Long movieId);
}
