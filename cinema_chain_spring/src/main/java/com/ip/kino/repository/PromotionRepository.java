package com.ip.kino.repository;

import com.ip.kino.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    @Query(value = "SELECT * FROM promocje p WHERE p.data_wygasniecia >= CURRENT_DATE", nativeQuery = true)
    List<Promotion> findAllValidPromotions();
}
