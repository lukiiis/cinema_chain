package com.ip.kino.controller;

import com.ip.kino.model.ToWatch;
import com.ip.kino.service.ToWatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/private")
public class ToWatchController {
    private final ToWatchService toWatchService;
    @GetMapping("/to-watch/{login}")
    public ResponseEntity<List<ToWatch>> getAllToWatchByLogin(@PathVariable String login){
        return ResponseEntity.ok(toWatchService.getAllToWatchByLogin(login));
    }
    @GetMapping("/to-watch/{login}/{movieId}")
    public ResponseEntity<ToWatch> getToWatchByLoginAndMovieId(@PathVariable String login, @PathVariable Long movieId){
        return ResponseEntity.ok(toWatchService.getToWatchByLoginAndMovieId(login, movieId));
    }

    @PostMapping("/add-towatch")
    public ResponseEntity<?> addToWatch(@RequestParam("login") String login, @RequestParam("movieId") Long movieId){
        return ResponseEntity.ok(toWatchService.addToWatch(login, movieId));
    }

    @PostMapping("/delete-towatch")
    public ResponseEntity<?> deleteToWatch(@RequestParam("login") String login, @RequestParam("movieId") Long movieId){
        return ResponseEntity.ok(toWatchService.deleteToWatch(login, movieId));
    }
}
