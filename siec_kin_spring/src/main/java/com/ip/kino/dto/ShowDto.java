package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShowDto {
    private String startTime;
    private LocalDate showDate;
    private Long screeningRoomId;
    private Long cinemaId;
    private Long movieId;
    private String lector;
    private String movieFormat;
}
