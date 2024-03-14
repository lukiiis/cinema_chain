package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScreeningRoomDto {
    private Long screeningRoomId;
    private Long cinemaId;
    private String name;
    private Long numberOfSeats;
}
