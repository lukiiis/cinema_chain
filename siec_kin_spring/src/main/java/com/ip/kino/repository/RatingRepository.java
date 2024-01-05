package com.ip.kino.repository;

import com.ip.kino.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query(value = "SELECT o.* FROM OCENA o INNER JOIN KLIENT k ON (o.id_klienta = k.id_klienta) INNER JOIN UZYTKOWNIK u ON (k.id_uzytkownika = u.id_uzytkownika) WHERE u.login = :login", nativeQuery = true)
    List<Rating> findAllRatingsByLogin(String login);

    @Query(value = "SELECT o.* FROM OCENA o INNER JOIN KLIENT k ON (o.id_klienta = k.id_klienta) INNER JOIN UZYTKOWNIK u ON (k.id_uzytkownika = u.id_uzytkownika) WHERE u.login = :login AND o.id_filmu = :movieId", nativeQuery = true)
    Rating findRatingByLoginAndMovieId(String login, Long movieId);
}
