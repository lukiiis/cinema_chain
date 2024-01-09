package com.ip.kino.service;

import com.ip.kino.model.Client;
import com.ip.kino.model.Movie;
import com.ip.kino.model.Rating;
import com.ip.kino.model.User;
import com.ip.kino.repository.MovieRepository;
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
    private final MovieRepository filmRepository;

    public List<Rating> getAllRatingsByLogin(String login){
        return ratingRepository.findAllRatingsByLogin(login);
    }
    public Rating getRatingByLoginAndMovieId(String login, Long movieId){
        return ratingRepository.findRatingByLoginAndMovieId(login, movieId);
    }


    public Object addRating(String login, Long movieId, Long rating) {
        try{
            User user = userRepository.findByLogin(login).orElseThrow();
            Movie movie = filmRepository.findMovieByMovieId(movieId).orElseThrow();
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

    public Double getRatingMean(Long movieId) {
        List<Rating> ratings = ratingRepository.findAllRatingsByMovieId(movieId);

        if(ratings.isEmpty()){
            return 0D;
        }

        double mean = 0.0;
        double sum = 0.0;
        for (Rating rating:ratings) {
            sum += rating.getRating();
        }
        double scale = Math.pow(10,2);
        mean = Math.round((sum / (double) ratings.size()) * scale) / scale;
        return mean;
    }

    public Object deleteRating(String login, Long movieId) {
        try{
            User user = userRepository.findByLogin(login).orElseThrow();
            Movie movie = filmRepository.findMovieByMovieId(movieId).orElseThrow();

            Rating rating = ratingRepository.findRatingByLoginAndMovieId(login, movieId);
            if(rating == null){
                return "Movie is not rated";
            }

            ratingRepository.delete(rating);

            return "Rating deleted successfully";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error while deleting rating";
        }
    }

    public Object updateRating(String login, Long movieId, Long rating) {
        try{
            Rating ratingToUpdate = ratingRepository.findRatingByLoginAndMovieId(login, movieId);
            if(ratingToUpdate == null){
                return "Movie is not rated";
            }
            ratingToUpdate.setRating(rating);
            ratingRepository.save(ratingToUpdate);
            return "Rating updated successfully";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error while updating rating";
        }
    }
}
