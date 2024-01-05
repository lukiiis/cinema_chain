package com.ip.kino.service;

import com.ip.kino.model.Client;
import com.ip.kino.model.Film;
import com.ip.kino.model.Rating;
import com.ip.kino.model.User;
import com.ip.kino.repository.FilmRepository;
import com.ip.kino.repository.RatingRepository;
import com.ip.kino.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final FilmRepository filmRepository;

    public List<Rating> getAllRatingsByLogin(String login){
        return ratingRepository.findAllRatingsByLogin(login);
    }
    public Rating getRatingByLoginAndMovieId(String login, Long movieId){
        return ratingRepository.findRatingByLoginAndMovieId(login, movieId);
    }


    public Object addRating(String login, Long movieId, Long rating) {
        try{
            User user = userRepository.findByLogin(login).orElseThrow();
            Film movie = filmRepository.findMovieByMovieId(movieId).orElseThrow();
            Client client = user.getClient();

            Rating newRating = new Rating();
            newRating.setClient(client);
            newRating.setMovie(movie);
            newRating.setRating(rating);

            ratingRepository.save(newRating);

            return "Rating added successfully";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error while adding rating";
        }
    }
}
