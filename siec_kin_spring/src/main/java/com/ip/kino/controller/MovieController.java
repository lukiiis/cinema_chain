package com.ip.kino.controller;

import com.ip.kino.config.MovieResponse;
import com.ip.kino.dto.MovieDto;
import com.ip.kino.model.Movie;
import com.ip.kino.service.MovieService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1")
public class MovieController {
    private final MovieService filmService;

    @Autowired
    public MovieController(MovieService filmService){
        this.filmService = filmService;
    }

    @GetMapping("/film")
    public List<Movie> getAllFilmy(){
            return filmService.getLatestFilms();
    }

    @GetMapping("/zapowiedzi")
    public List<Movie> getZapowiedzi() {
        return filmService.getZapowiedzi();
    }

    @GetMapping("film/{id}")
    public Movie getFilmById(@PathVariable Long id){
        return  filmService.getFilmByID(id);
    }

    @PostMapping("/addMovie")
    public ResponseEntity<MovieResponse> addMovie(@RequestBody MovieDto request){
        MovieResponse status = filmService.addMovie(request);
        return ResponseEntity.ok(status);
    }
}
