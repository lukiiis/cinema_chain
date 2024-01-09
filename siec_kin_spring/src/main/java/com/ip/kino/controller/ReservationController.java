package com.ip.kino.controller;

import com.ip.kino.config.ReservationResponse;
import com.ip.kino.dto.ReservationDto;
import com.ip.kino.model.Reservation;
import com.ip.kino.model.ReservedSeats;
import com.ip.kino.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ReservationController {
    private final ReservationService reservationService;
    @GetMapping("/private/reservations/id/{clientId}")
    public ResponseEntity<List<Reservation>> getReservationsByClientId(@PathVariable Long clientId){
        return ResponseEntity.ok(reservationService.getAllReservationsByClientId(clientId));
    }

    @GetMapping("/private/reservations/{login}")
    public ResponseEntity<List<Reservation>> getReservationsByLogin(@PathVariable String login){
        return ResponseEntity.ok(reservationService.getAllReservationsByLogin(login));
    }

    @GetMapping("/public/reservations/reservedSeats/{seansID}")
    public ResponseEntity<List<ReservedSeats>> getReservedSeats(@PathVariable Long seansID){
        return ResponseEntity.ok(reservationService.findAllReservedSeatsByIdSeansu(seansID));
    }

    @PostMapping("/public/addReservation")
    public ResponseEntity<ReservationResponse> addReservation(@RequestBody ReservationDto request){
        ReservationResponse status = reservationService.addReservation(request);
        return ResponseEntity.ok(status);
    }


}
