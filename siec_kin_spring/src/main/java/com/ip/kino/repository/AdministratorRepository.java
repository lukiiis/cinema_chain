package com.ip.kino.repository;

import com.ip.kino.model.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    @Query(value = "SELECT MAX(a.id_administratora) FROM administrator a", nativeQuery = true)
    Long findMaxIdAdministratora();
}
