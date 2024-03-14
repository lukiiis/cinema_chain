package com.ip.kino.service;

import com.ip.kino.config.ReservationResponse;
import com.ip.kino.dto.ReservationDto;
import com.ip.kino.model.Client;
import com.ip.kino.model.Reservation;
import com.ip.kino.model.ReservedSeats;
import com.ip.kino.repository.ReservationRepository;
import com.ip.kino.repository.ReservedSeatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservedSeatsRepository reservedSeatsRepository;

    public List<ReservedSeats> findAllReservedSeatsByIdSeansu(Long seansID){
        return reservedSeatsRepository.findAllReservedSeatsByShowId(seansID);
    }

    public List<Reservation> getAllReservationsByClientId(Long clientId){
        return reservationRepository.findReservationsByClientId(clientId);
    }

    public List<Reservation> getAllReservationsByLogin(String login){
        return reservationRepository.findReservationsByLogin(login);
    }


    public ReservationResponse addReservation(ReservationDto request) {
        List<Reservation> showList = reservationRepository.findAll();

            if (request.getFirstName().equals("") || request.getLastName().equals("")
                    || request.getEmail().equals("") || request.getPhoneNumber().equals("")
                    || request.getSeatNumber() == null || request.getSeatRow() == null
                    || request.getPurchaseDate().equals("") || request.getTicketType().equals("")
                    || request.getPrice().equals("") || request.getShowID().equals("")) {
                return ReservationResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .build();
            }

        Client client = null;

        if(request.getClientID() != null){
             client = reservationRepository.findClientById(request.getClientID());
        }
        else{
             client = null;
        }

        var show = reservationRepository.findShowById(request.getShowID());


        Reservation reservation = new Reservation(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPhoneNumber(), request.getSeatNumber(), request.getSeatRow(), request.getPurchaseDate(), request.getTicketType(), request.getPrice(),client, show);
        reservationRepository.save(reservation);

        ReservedSeats reservedSeats = new ReservedSeats(request.getSeatID(), reservation.getReservationId(), request.getShowID());
        reservedSeatsRepository.save(reservedSeats);

        return ReservationResponse.builder()
                .status("Rezerwacja zostala dodana.")
                .firstName(reservation.getFirstName())
                .price(reservation.getPrice())
                .Id(request.getSeatID())
                .build();
    }
}
