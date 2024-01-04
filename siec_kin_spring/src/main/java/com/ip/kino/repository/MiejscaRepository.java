package com.ip.kino.repository;

import com.ip.kino.model.Miejsca;
import com.ip.kino.model.Seans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MiejscaRepository extends JpaRepository<Miejsca, Long> {


    @Query(value = "select s.* from Miejsca s where s.id_sali = :salaId", nativeQuery = true)
    List<Miejsca> findAllMiejscaByIdSali(Long salaId);
}
