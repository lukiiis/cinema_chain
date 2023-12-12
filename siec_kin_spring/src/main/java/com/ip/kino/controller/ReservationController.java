package com.ip.kino.controller;

import com.ip.kino.model.Reservation;
import com.ip.kino.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/private")
public class ReservationController {
    private final ReservationService reservationService;
    @GetMapping("/reservations/id/{clientId}")
    public ResponseEntity<List<Reservation>> getReservationsByClientId(@PathVariable Long clientId){
        return ResponseEntity.ok(reservationService.getAllReservationsByClientId(clientId));
    }

    @GetMapping("/reservations/{login}")
    public ResponseEntity<List<Reservation>> getReservationsByLogin(@PathVariable String login){
        return ResponseEntity.ok(reservationService.getAllReservationsByLogin(login));
    }
}
