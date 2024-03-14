package com.ip.kino.service;


import com.ip.kino.dto.*;
import com.ip.kino.model.Cinema;
import com.ip.kino.model.ScreeningRoom;
import com.ip.kino.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CinemaService {
    private final CinemaRepository cinemaRepository;
    @Autowired
    public CinemaService(CinemaRepository cinemaRepository){
        this.cinemaRepository = cinemaRepository;
    }
    public List<Cinema> getAllCinema(){
        return cinemaRepository.findAll();
    }

    public List<CinemaDto> getCinemaWithoutSeats(){
        List<Cinema> cinemaList = cinemaRepository.findAll();
        List<CinemaDto> cinemaDtoList = new ArrayList<>();

        for (Cinema cinema : cinemaList) {
            CinemaDto cinemaDto = convertToDto(cinema);
            cinemaDtoList.add(cinemaDto);
        }
        return cinemaDtoList;
    }
    private CinemaDto convertToDto(Cinema cinema) {
        CinemaDto cinemaDto = new CinemaDto();
        cinemaDto.setCinemaId(cinema.getCinemaId());
        cinemaDto.setCity(cinema.getCity());
        cinemaDto.setStreet(cinema.getStreet());
        cinemaDto.setBuilding_number(cinema.getBuilding_number());
        cinemaDto.setZip_code(cinema.getZip_code());
        cinemaDto.setScreeningrooms(convertScreeningRoom(cinema.getScreeningRooms()));

        return cinemaDto;
    }
    private List<ScreeningRoomDto> convertScreeningRoom(List<ScreeningRoom> screeningRooms) {
        List<ScreeningRoomDto> salaDtoList = new ArrayList<>();

        for (ScreeningRoom screeningRoom : screeningRooms) {
            ScreeningRoomDto screeningRoomDto = new ScreeningRoomDto();
            screeningRoomDto.setScreeningRoomId(screeningRoom.getScreeningRoomId());
            screeningRoomDto.setCinemaId(screeningRoom.getCinemaId());
            screeningRoomDto.setName(screeningRoom.getName());
            screeningRoomDto.setNumberOfSeats(screeningRoom.getNumberOfSeats());
            salaDtoList.add(screeningRoomDto);
        }
        return salaDtoList;
    }
}
