package com.ip.kino.repository;

import com.ip.kino.model.Pracownik;
import com.ip.kino.model.Promocje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PromocjeRepository extends JpaRepository<Promocje, Long> {
    @Query(value = "SELECT * FROM promocje p WHERE p.data_wygasniecia >= CURRENT_DATE", nativeQuery = true)
    List<Promocje> findAllValidPromocje();
}
