package com.ip.kino.service;

import com.ip.kino.model.Film;
import com.ip.kino.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FilmService {

    List<Film> LatestFilms = new ArrayList<>();
    private final FilmRepository filmRepository;
    @Autowired
    public FilmService(FilmRepository filmRepository){
        this.filmRepository = filmRepository;
    }

    public List<Film> getAllFilm(){
        System.out.println(filmRepository.findAll());
        return filmRepository.findAll();
    }
    public Film getFilmByID(Long id){
        return filmRepository.findById(id).orElse(null);
    }

    public List<Film> getLatestFilms(){
        LatestFilms = filmRepository.findAll();
        Comparator<Film> comparator = Comparator.comparing(Film::getData_premiery);
        Collections.sort(LatestFilms, comparator);
        return LatestFilms;
    }
    public List<Film> getZapowiedzi(){
        return filmRepository.findZapowiedzi();
    }

}
