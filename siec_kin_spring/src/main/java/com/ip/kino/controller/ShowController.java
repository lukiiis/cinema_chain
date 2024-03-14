package com.ip.kino.controller;

import com.ip.kino.config.ShowResponse;
import com.ip.kino.dto.ShowDto;
import com.ip.kino.model.Show;
import com.ip.kino.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ShowController {
    private final ShowService showService;
    @Autowired
    public ShowController(ShowService showService){
        this.showService = showService;
    }

    @GetMapping("/show")
    public List<Show> getAllShows(){
        return showService.getAllShows();
    }

    @GetMapping("/show/{id}")
    public Show getShowById(@PathVariable Long id){
        return showService.getShowById(id);
    }

    @GetMapping("/show/cinema/{cinemaId}")
    public List<Show> getSeansByIdKina(@PathVariable Long cinemaId) {return showService.findAllByCinemaId(cinemaId);}


    @GetMapping("/show/{cinemaId}/{movieId}")
    public List<Show> findAllByCinemaAndMovie(@PathVariable Long cinemaId, @PathVariable Long movieId){
        return showService.findAllByCinemaAndMovie(cinemaId, movieId);
    }

    @GetMapping("/show/{cinemaId}/{hallId}/{data}")
    public List<Show> findAllByDataKinoSala(@PathVariable Long cinemaId, @PathVariable Long hallId, @PathVariable LocalDate data){
        return showService.findAllByDataCinemaScreeningRoom(cinemaId, hallId, data);
    }

    @PostMapping("/addShow")
    public ResponseEntity<ShowResponse> addShow(@RequestBody ShowDto request){
        ShowResponse status = showService.addShow(request);
        return ResponseEntity.ok(status);
    }
}
