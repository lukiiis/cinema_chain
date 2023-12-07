package com.ip.kino.repository;

import com.ip.kino.model.Film;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {
    @Query(value="SELECT * FROM film f WHERE f.data_premiery > CURRENT_DATE", nativeQuery = true)
    List<Film> findZapowiedzi();

}
