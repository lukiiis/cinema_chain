package com.ip.kino.dto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CinemaDto {
    private int cinemaId;
    private String city;
    private String street;
    private String building_number;
    private String zip_code;
    private List<ScreeningRoomDto> screeningrooms;
}
