package com.ip.kino.repository;

import com.ip.kino.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value = "SELECT MAX(p.id_pracownika) FROM pracownik p", nativeQuery = true)
    Long findMaxEmployeeId();

    @Query(value = "SELECT id_kina from pracownik join uzytkownik on pracownik.id_uzytkownika = uzytkownik.id_uzytkownika where uzytkownik.login = :login", nativeQuery = true)
    Long findCinemaIdByEmployeeId(@Param("login") String login);
}
