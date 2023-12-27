package com.ip.kino.repository;

import com.ip.kino.model.Klient;
import com.ip.kino.model.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UzytkownikRepository extends JpaRepository<Uzytkownik, Long> {
    @Query(value = "SELECT MAX(u.id_uzytkownika) FROM uzytkownik u", nativeQuery = true)
    Long findMaxIdUzytkownika();

    Optional<Uzytkownik> findByLogin(String login);
    @Query(value = "SELECT * FROM uzytkownik u WHERE u.id_uzytkownika = :id", nativeQuery = true)
    Optional<Uzytkownik> findByIdUzytkownika(Long id);

    @Query(value = "DELETE FROM uzytkownik u WHERE u.id_uzytkownika = :id", nativeQuery = true)
    void deleteUser(Long id);
}
