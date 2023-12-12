package com.ip.kino.controller;

import com.ip.kino.model.Film;
import com.ip.kino.service.FilmService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
public class FilmController {
    private final FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService){
        this.filmService = filmService;
    }

    @GetMapping("/film")
    public List<com.ip.kino.model.Film> getAllFilmy(){
            return filmService.getLatestFilms();
    }
    @GetMapping("film/{id}")
    public Film getFilmById(@PathVariable Long id){
        return  filmService.getFilmByID(id);
    }
}
