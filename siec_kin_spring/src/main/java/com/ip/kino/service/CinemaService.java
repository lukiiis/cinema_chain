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
    private final CinemaRepository kinoRepository;
    @Autowired
    public CinemaService(CinemaRepository kinoRepository){
        this.kinoRepository = kinoRepository;
    }
    public List<Cinema> getAllKino(){
        return kinoRepository.findAll();
    }

    public List<CinemaDto> getKinoWithoutSeats(){
        List<Cinema> kinoList = kinoRepository.findAll();
        List<CinemaDto> kinoDtoList = new ArrayList<>();

        for (Cinema kino : kinoList) {
            CinemaDto kinoDto = convertToDto(kino);
            kinoDtoList.add(kinoDto);
        }
        return kinoDtoList;
    }
    private CinemaDto convertToDto(Cinema kino) {
        CinemaDto kinoDto = new CinemaDto();
        kinoDto.setCinemaId(kino.getCinemaId());
        kinoDto.setCity(kino.getCity());
        kinoDto.setStreet(kino.getStreet());
        kinoDto.setBuilding_number(kino.getBuilding_number());
        kinoDto.setZip_code(kino.getZip_code());
         kinoDto.setScreeningrooms(konwertujSale(kino.getScreeningRooms()));

        return kinoDto;
    }
    private List<ScreeningRoomDto> konwertujSale(List<ScreeningRoom> sale) {
        List<ScreeningRoomDto> salaDtoList = new ArrayList<>();

        for (ScreeningRoom screeningRoom : sale) {
            ScreeningRoomDto salaDto = new ScreeningRoomDto();
            salaDto.setId_sali(screeningRoom.getScreeningRoomId());
            salaDto.setId_kina(screeningRoom.getCinemaId());
            salaDto.setNazwa(screeningRoom.getName());
            salaDto.setIlosc_miejsc(screeningRoom.getNumberOfSeats());
            salaDtoList.add(salaDto);
        }
        return salaDtoList;
    }
}
