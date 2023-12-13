package com.ip.kino.repository;

import com.ip.kino.model.Pracownik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PracownikRepository extends JpaRepository<Pracownik, Long> {
    @Query(value = "SELECT MAX(p.id_pracownika) FROM pracownik p", nativeQuery = true)
    Long findMaxIdPracownika();
}
