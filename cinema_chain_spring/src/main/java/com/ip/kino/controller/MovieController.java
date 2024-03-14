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
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService filmService){
        this.movieService = filmService;
    }

    @GetMapping("/movie")
    public List<Movie> getAllMovies(){
            return movieService.getLatestFilms();
    }

    @GetMapping("/slider-movies")
    public List<Movie> getSliderMovies(){
        return movieService.getSliderMovies();
    }

    @GetMapping("/announcements")
    public List<Movie> getAnnouncements() {
        return movieService.getAnnouncements();
    }

    @GetMapping("movie/{id}")
    public Movie getFilmById(@PathVariable Long id){
        return  movieService.getMovieByID(id);
    }

    @PostMapping("/addMovie")
    public ResponseEntity<MovieResponse> addMovie(@RequestBody MovieDto request){
        MovieResponse status = movieService.addMovie(request);
        return ResponseEntity.ok(status);
    }
}
