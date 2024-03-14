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
    private final ShowRepository showRepository;

    @Autowired
    public ShowService(ShowRepository showRepository){
        this.showRepository = showRepository;
    }
    public List<Show> getAllShows(){
        return showRepository.findAll();
    }
    public Show getShowById(Long id){
        return showRepository.findById(id).orElse(null);
    }
    public List<Show> findAllByCinemaAndMovie(Long id, Long movieId){
        return showRepository.findAllByCinemaAndMovie(id, movieId);
    }

    public List<Show> findAllByCinemaId(Long cinemaId){
        return showRepository.findAllByCinemaId(cinemaId);
    }

    public List<Show> findAllByDataCinemaScreeningRoom(Long cinemaId, Long screeningRoomId, LocalDate data){
        return showRepository.findAllByDataCinemaScreeningRoom(cinemaId,screeningRoomId,data);
    }


    public ShowResponse addShow(ShowDto request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Show> showList = showRepository.findAll();
        for (Show addedShows : showList) {
            if (request.getLector().equals("") || request.getShowDate() == null ||
                    request.getScreeningRoomId() == null || request.getMovieFormat().equals("") ||
                    request.getCinemaId() == null|| request.getMovieId() == null ||
                    request.getStartTime().equals("")) {
                return ShowResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .build();
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long showId = showRepository.findMaxShowId();
        if (showId == null)
            showId = 1L;
        else
            showId += 1;

        var movie = showRepository.findMovieById(request.getMovieId());
        var cinema = showRepository.findCinemaById(request.getCinemaId());

        Show show = new Show(showId, request.getStartTime(), request.getShowDate(), request.getLector(),request.getMovieFormat(),request.getScreeningRoomId(), movie, cinema);
        showRepository.save(show);

        return ShowResponse.builder()
                .status("Seans zostal dodany.")
                .data(show.getShowDate())
                .time(show.getStartTime())
                .build();

    }

}
