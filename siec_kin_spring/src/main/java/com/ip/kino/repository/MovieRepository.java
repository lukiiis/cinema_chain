package com.ip.kino.repository;

import com.ip.kino.model.Movie;
import com.ip.kino.model.MovieCategory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query(value="SELECT * FROM film f WHERE f.data_premiery > CURRENT_DATE", nativeQuery = true)
    List<Movie> findZapowiedzi();

    @Query(value = "SELECT MAX(u.id_filmu) FROM film u", nativeQuery = true)
    Long findMaxIdFilmu();

    @Query("SELECT k FROM MovieCategory k WHERE k.categoryId = :id")
    MovieCategory findKategoriaById(@Param("id") Long id);


    @Query(value = "SELECT f.* FROM FILM f WHERE f.id_filmu = :movieId", nativeQuery = true)
    Optional<Movie> findMovieByMovieId(Long movieId);

}
