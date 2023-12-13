package com.ip.kino.service;

import com.ip.kino.model.Reservation;
import com.ip.kino.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public List<Reservation> getAllReservationsByClientId(Long clientId){
        return reservationRepository.findReservationsByClientId(clientId);
    }

    public List<Reservation> getAllReservationsByLogin(String login){
        return reservationRepository.findReservationsByLogin(login);
    }
}
