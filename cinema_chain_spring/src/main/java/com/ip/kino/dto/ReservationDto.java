package com.ip.kino.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private String firstName;
    private String lastName;
    private String email;
    private Long phoneNumber;
    private Long seatNumber;
    private String seatRow;
    private LocalDate purchaseDate;
    private String ticketType;
    private Double price;
    private Long showID;
    private Long clientID;
    private Long seatID;
}
