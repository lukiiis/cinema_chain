package com.ip.kino.repository;

import com.ip.kino.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT MAX(u.id_uzytkownika) FROM uzytkownik u", nativeQuery = true)
    Long findMaxUserId();

    Optional<User> findByLogin(String login);
    @Query(value = "SELECT * FROM uzytkownik u WHERE u.id_uzytkownika = :id", nativeQuery = true)
    Optional<User> findByUserId(Long id);

    @Query(value = "DELETE FROM uzytkownik u WHERE u.id_uzytkownika = :id", nativeQuery = true)
    void deleteUser(Long id);
}
