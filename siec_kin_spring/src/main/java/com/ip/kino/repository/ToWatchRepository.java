package com.ip.kino.repository;

import com.ip.kino.model.ToWatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ToWatchRepository extends JpaRepository<ToWatch, Long> {
    @Query(value = "SELECT d.* FROM DO_OBEJRZENIA d INNER JOIN KLIENT k ON (d.id_klienta = k.id_klienta) INNER JOIN UZYTKOWNIK u ON (k.id_uzytkownika = u.id_uzytkownika) WHERE u.login = :login", nativeQuery = true)
    List<ToWatch> findAllToWatchByLogin(String login);

    @Query(value = "SELECT d.* FROM DO_OBEJRZENIA d INNER JOIN KLIENT k ON (d.id_klienta = k.id_klienta) INNER JOIN UZYTKOWNIK u ON (k.id_uzytkownika = u.id_uzytkownika) WHERE u.login = :login AND d.id_filmu = :movieId", nativeQuery = true)
    ToWatch findToWatchByLoginAndMovieId(String login, Long movieId);
}
