package com.ip.kino.service;

import com.ip.kino.config.MovieResponse;
import com.ip.kino.dto.MovieDto;
import com.ip.kino.model.Movie;
import com.ip.kino.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MovieService {

    List<Movie> LatestFilms = new ArrayList<>();
    private final MovieRepository movieRepository;
    @Autowired
    public MovieService(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovie(){
        System.out.println(movieRepository.findAll());
        return movieRepository.findAll();
    }
    public Movie getMovieByID(Long id){
        return movieRepository.findById(id).orElse(null);
    }

    public List<Movie> getLatestFilms(){
        LatestFilms = movieRepository.findAll();
        Comparator<Movie> comparator = Comparator.comparing(Movie::getRelease_date);
        LatestFilms.sort(comparator);
        return LatestFilms;
    }
    public List<Movie> getAnnouncements(){
        return movieRepository.findAnnouncements();
    }


    public MovieResponse addMovie(MovieDto request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Movie> movieList = movieRepository.findAll();
        for (Movie addedMovies : movieList) {
            if (addedMovies.getTitle().equals(request.getTitle())) {
                //zwracam 2 i obsluguje w kontrolerze
                return MovieResponse.builder()
                        .status("Film o takim tytule juz istnieje.")
                        .build();
            }

            if (request.getTitle().equals("") || request.getDescription().equals("") ||
                    request.getDirector().equals("") || request.getRelease_date().equals("") ||
                    request.getCategoryId().equals("") || request.getPicture_url().equals("") ||
                    request.getPoster_url().equals("") || request.getDuration() == null) {
                return MovieResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .build();
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long movieId = movieRepository.findMaxMovieId();
        if (movieId == null)
            movieId = 1L;
        else
            movieId += 1;

        var kategoria = movieRepository.findCategoryById(request.getCategoryId());

        Movie film = new Movie(movieId, request.getTitle(), request.getDescription(), request.getDirector(),
                request.getPicture_url(), request.getPoster_url(),request.getRelease_date(),request.getDuration(),
                kategoria);
        movieRepository.save(film);

        return MovieResponse.builder()
                .status("Film zostal dodany.")
                .title(film.getTitle())
                .build();

    }

    public List<Movie> getSliderMovies() {
        return movieRepository.findSliderMovies();
    }
}
