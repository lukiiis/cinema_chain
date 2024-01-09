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
    private final MovieRepository filmRepository;
    @Autowired
    public MovieService(MovieRepository filmRepository){
        this.filmRepository = filmRepository;
    }

    public List<Movie> getAllFilm(){
        System.out.println(filmRepository.findAll());
        return filmRepository.findAll();
    }
    public Movie getFilmByID(Long id){
        return filmRepository.findById(id).orElse(null);
    }

    public List<Movie> getLatestFilms(){
        LatestFilms = filmRepository.findAll();
        Comparator<Movie> comparator = Comparator.comparing(Movie::getRelease_date);
        LatestFilms.sort(comparator);
        return LatestFilms;
    }
    public List<Movie> getZapowiedzi(){
        return filmRepository.findZapowiedzi();
    }


    public MovieResponse addMovie(MovieDto request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Movie> movieList = filmRepository.findAll();
        for (Movie addedMovies : movieList) {
            if (addedMovies.getTitle().equals(request.getTytul())) {
                //zwracam 2 i obsluguje w kontrolerze
                return MovieResponse.builder()
                        .status("Film o takim tytule juz istnieje.")
                        .build();
            }

            if (request.getTytul().equals("") || request.getOpis().equals("") ||
                    request.getRezyser().equals("") || request.getData_premiery().equals("") ||
                    request.getId_kategorii().equals("") || request.getObraz_url().equals("") ||
                    request.getPlakat_url().equals("") || request.getCzas_trwania() == null) {
                return MovieResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .build();
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long id_filmu = filmRepository.findMaxIdFilmu();
        if (id_filmu == null)
            id_filmu = 1L;
        else
            id_filmu += 1;

        var kategoria = filmRepository.findKategoriaById(request.getId_kategorii());

        Movie film = new Movie(id_filmu, request.getTytul(), request.getOpis(), request.getRezyser(),
                request.getObraz_url(), request.getPlakat_url(),request.getData_premiery(),request.getCzas_trwania(),
                kategoria);
        filmRepository.save(film);

        return MovieResponse.builder()
                .status("Film zostal dodany.")
                .tytul(film.getTitle())
                .build();

    }
}
