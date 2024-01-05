package com.ip.kino.controller;

import com.ip.kino.model.Rating;
import com.ip.kino.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/private")
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/ratings/{login}")
    public ResponseEntity<List<Rating>> getAllRatingsByLogin(@PathVariable String login){
        return ResponseEntity.ok(ratingService.getAllRatingsByLogin(login));
    }

    @GetMapping("/rating/{login}/{movieId}")
    public ResponseEntity<Rating> getRatingByLoginAndMovieId(@PathVariable String login, @PathVariable Long movieId){
        return ResponseEntity.ok(ratingService.getRatingByLoginAndMovieId(login, movieId));
    }

    @PostMapping("/add-rating")
    public ResponseEntity<?> addRating(@RequestParam("login") String login, @RequestParam("movieId") Long movieId, @RequestParam("rating") Long rating){
        return ResponseEntity.ok(ratingService.addRating(login, movieId, rating));
    }
}
