package com.ip.kino.repository;

import com.ip.kino.model.Film;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {

}
