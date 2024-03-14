package com.ip.kino.dto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ip.kino.dto.CinemaDto;
import com.ip.kino.model.Movie;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ShowWithoutSeatsDto {
    private Long showId;
    private String startTime;
    private LocalDate showDate;
    private String lector;
    private String movieFormat;
    private Long screeningRoomId;
    @JsonIgnoreProperties("shows")
    private Movie movie;
    private CinemaDto cinema;
}
