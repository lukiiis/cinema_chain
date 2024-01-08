package com.ip.kino.repository;

import com.ip.kino.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ReservedSeatsRepository extends JpaRepository<ReservedSeats, Long> {

    @Query(value = "SELECT MAX(u.id_miejsca_zarezerwowanego) FROM miejsca_zarezerwowane u", nativeQuery = true)
    Long getMaxIdReservedSeat();

    @Query(value = "select s.* from miejsca_zarezerwowane s where s.id_seansu = :seansID", nativeQuery = true)
    List<ReservedSeats> findAllReservedSeatsByIdSeansu(Long seansID);

}