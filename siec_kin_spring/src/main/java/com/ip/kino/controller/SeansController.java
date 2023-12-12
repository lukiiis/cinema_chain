package com.ip.kino.controller;

import com.ip.kino.model.Seans;
import com.ip.kino.service.SeansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class SeansController {
    private final SeansService seansService;
    @Autowired
    public SeansController(SeansService seansService){
        this.seansService = seansService;
    }

    @GetMapping("/seans")
    public List<Seans> getAllSeans(){
        return seansService.getAllSeans();
    }

    @GetMapping("/seans/{id}")
    public List<Seans> getSeansById(@PathVariable Long id){
        return seansService.getSeansById(id);
    }

    @GetMapping("/seans/kino/{idKina}")
    public List<Seans> getSeansByIdKina(@PathVariable Long idKina) {return seansService.findAllByIdKina(idKina);}


    @GetMapping("/seans/{idKina}/{idFilmu}")
    public List<Seans> findAllByKinoAndFilm(@PathVariable Long idKina, @PathVariable Long idFilmu){
        return seansService.findAllByKinoAndFilm(idKina, idFilmu);
    }
}
