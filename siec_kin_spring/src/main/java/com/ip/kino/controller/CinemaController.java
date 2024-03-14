package com.ip.kino.controller;

import com.ip.kino.dto.CinemaDto;
import com.ip.kino.model.Cinema;
import com.ip.kino.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CinemaController {

    private final CinemaService kinoService;
    @Autowired
    public CinemaController(CinemaService kinoService){
        this.kinoService = kinoService;
    }

    @GetMapping("/cinema")
    public List<CinemaDto> getAllKinoWithoutSeats(){
        return kinoService.getCinemaWithoutSeats();
    }

    @GetMapping("/cinemaWithSeats")
    public List<Cinema> getAllKino(){return  kinoService.getAllCinema();}

    @GetMapping("/private/cinemas")
    public List<Cinema> getAllCinemas(){
        return kinoService.getAllCinema();
    }
}
