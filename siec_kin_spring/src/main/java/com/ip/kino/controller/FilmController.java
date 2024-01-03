package com.ip.kino.controller;

import com.ip.kino.config.AuthenticationResponse;
import com.ip.kino.config.MovieResponse;
import com.ip.kino.dto.FilmDto;
import com.ip.kino.model.Film;
import com.ip.kino.service.FilmService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/zapowiedzi")
    public List<Film> getZapowiedzi() {
        return filmService.getZapowiedzi();
    }

    @GetMapping("film/{id}")
    public Film getFilmById(@PathVariable Long id){
        return  filmService.getFilmByID(id);
    }

    @PostMapping("/addMovie")
    public ResponseEntity<MovieResponse> addMovie(@RequestBody FilmDto request){
        MovieResponse status = filmService.addMovie(request);
        return ResponseEntity.ok(status);
    }
}
