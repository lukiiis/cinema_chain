package com.ip.kino.service;

import com.ip.kino.config.ShowResponse;
import com.ip.kino.dto.ShowDto;
import com.ip.kino.model.Show;
import com.ip.kino.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class ShowService {
    private final ShowRepository seansRepository;

    @Autowired
    public ShowService(ShowRepository seansRepository){
        this.seansRepository = seansRepository;
    }
    public List<Show> getAllSeans(){
        return seansRepository.findAll();
    }
    public Show getSeansById(Long id){
        return seansRepository.findById(id).orElse(null);
    }
    public List<Show> findAllByKinoAndFilm(Long id, Long filmId){
        return seansRepository.findAllByKinoAndFilm(id, filmId);
    }

    public List<Show> findAllByIdKina(Long KinoId){
        return seansRepository.findAllByIdKIna(KinoId);
    }

    public List<Show> findAllByDataKinoSala(Long kinoId, Long salaId, LocalDate data){
        return seansRepository.findAllByDataKinoSala(kinoId,salaId,data);
    }


    public ShowResponse addShow(ShowDto request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Show> showList = seansRepository.findAll();
        for (Show addedShows : showList) {
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

        Show seans = new Show(id_seansu, request.getGodzina_rozpoczecia(), request.getData_seansu(), request.getLektor(),request.getTyp_obrazu(),request.getId_sali(), film, kino);
        seansRepository.save(seans);

        return ShowResponse.builder()
                .status("Seans zostal dodany.")
                .data(seans.getShowDate())
                .godzina(seans.getStartTime())
                .build();

    }

}
