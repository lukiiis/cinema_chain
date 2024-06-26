package com.ip.kino.service;

import com.ip.kino.model.Client;
import com.ip.kino.model.Movie;
import com.ip.kino.model.ToWatch;
import com.ip.kino.model.User;
import com.ip.kino.repository.MovieRepository;
import com.ip.kino.repository.ToWatchRepository;
import com.ip.kino.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToWatchService {
    private final ToWatchRepository toWatchRepository;
    private final UserRepository userRepository;
    private final MovieRepository filmRepository;

    public List<ToWatch> getAllToWatchByLogin(String login){
        return toWatchRepository.findAllToWatchByLogin(login);
    }

    public ToWatch getToWatchByLoginAndMovieId(String login, Long movieId){
        return toWatchRepository.findToWatchByLoginAndMovieId(login, movieId);
    }

    public Object addToWatch(String login, Long movieId) {
        try{
            User user = userRepository.findByLogin(login).orElseThrow();
            Movie movie = filmRepository.findMovieByMovieId(movieId).orElseThrow();
            Client client = user.getClient();

            ToWatch toWatch = new ToWatch();
            toWatch.setClient(client);
            toWatch.setMovie(movie);

            toWatchRepository.save(toWatch);

            return "Movie successfully added to 'To Watch' list";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error while adding movie to 'To Watch' list";
        }
    }

    public Object deleteToWatch(String login, Long movieId) {
        try{
            User user = userRepository.findByLogin(login).orElseThrow();
            Movie movie = filmRepository.findMovieByMovieId(movieId).orElseThrow();

            ToWatch toWatch = toWatchRepository.findToWatchByLoginAndMovieId(login, movieId);
            if(toWatch == null){
                return "Movie is not on the list";
            }
            toWatchRepository.delete(toWatch);

            return "Movie successfully deleted from 'To Watch' list";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error while deleting movie from 'To Watch' list";
        }
    }
}
