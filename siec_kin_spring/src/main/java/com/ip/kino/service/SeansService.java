package com.ip.kino.service;

import com.ip.kino.config.MovieResponse;
import com.ip.kino.config.ShowResponse;
import com.ip.kino.dto.FilmDto;
import com.ip.kino.dto.SeansDto;
import com.ip.kino.model.Film;
import com.ip.kino.model.Seans;
import com.ip.kino.repository.SeansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
@Service
public class SeansService {
    private final SeansRepository seansRepository;

    @Autowired
    public  SeansService(SeansRepository seansRepository){
        this.seansRepository = seansRepository;
    }
    public List<Seans> getAllSeans(){
        return seansRepository.findAll();
    }
    public List<Seans> getSeansById(Long id){
        return (List<Seans>) seansRepository.findById(id).orElse(null);
    }
    public List<Seans> findAllByKinoAndFilm(Long id, Long filmId){
        return seansRepository.findAllByKinoAndFilm(id, filmId);
    }

    public List<Seans> findAllByIdKina(Long KinoId){
        return seansRepository.findAllByIdKIna(KinoId);
    }

    public List<Seans> findAllByDataKinoSala(Long kinoId, Long salaId, LocalDate data){
        return seansRepository.findAllByDataKinoSala(kinoId,salaId,data);
    }


    public ShowResponse addShow(SeansDto request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Seans> showList = seansRepository.findAll();
        for (Seans addedShows : showList) {
            if (request.getLektor().equals("") || request.getData_seansu() == null ||
                    request.getId_sali() == null || request.getTyp_obrazu().equals("") ||
                    request.getId_kina() == null|| request.getId_filmu() == null ||
                    request.getGodzina_rozpoczecia().equals("")) {
                return ShowResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .build();
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long id_seansu = seansRepository.findMaxIdSeansu();
        if (id_seansu == null)
            id_seansu = 1L;
        else
            id_seansu += 1;

        var film = seansRepository.findFilmById(request.getId_filmu());
        var kino = seansRepository.findKinoById(request.getId_kina());

        Seans seans = new Seans(id_seansu, request.getGodzina_rozpoczecia(), request.getData_seansu(), request.getLektor(),request.getTyp_obrazu(),request.getId_sali(), film, kino);
        seansRepository.save(seans);

        return ShowResponse.builder()
                .status("Seans zostal dodany.")
                .data(seans.getData_seansu())
                .godzina(seans.getGodzina_rozpoczecia())
                .build();

    }

}
