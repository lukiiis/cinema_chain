package com.ip.kino.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ip.kino.model.ScreeningRoom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ScreeningRoomRepository extends JpaRepository<ScreeningRoom, Long> {

    @Query("SELECT k FROM ScreeningRoom k WHERE k.screeningRoomId = :id")
    ScreeningRoom findSalaById(@Param("id") Long id);


}