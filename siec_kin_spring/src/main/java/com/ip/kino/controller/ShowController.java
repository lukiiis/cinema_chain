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
    private final ShowService seansService;
    @Autowired
    public ShowController(ShowService seansService){
        this.seansService = seansService;
    }

    @GetMapping("/seans")
    public List<Show> getAllSeans(){
        return seansService.getAllSeans();
    }

    @GetMapping("/seans/{id}")
    public Show getSeansById(@PathVariable Long id){
        return seansService.getSeansById(id);
    }

    @GetMapping("/seans/kino/{idKina}")
    public List<Show> getSeansByIdKina(@PathVariable Long idKina) {return seansService.findAllByIdKina(idKina);}


    @GetMapping("/seans/{idKina}/{idFilmu}")
    public List<Show> findAllByKinoAndFilm(@PathVariable Long idKina, @PathVariable Long idFilmu){
        return seansService.findAllByKinoAndFilm(idKina, idFilmu);
    }

    @GetMapping("/seans/{idKina}/{idSali}/{data}")
    public List<Show> findAllByDataKinoSala(@PathVariable Long idKina, @PathVariable Long idSali, @PathVariable LocalDate data){
        return seansService.findAllByDataKinoSala(idKina, idSali, data);
    }

    @PostMapping("/addShow")
    public ResponseEntity<ShowResponse> addShow(@RequestBody ShowDto request){
        ShowResponse status = seansService.addShow(request);
        return ResponseEntity.ok(status);
    }
}
