package com.ip.kino.controller;

import com.ip.kino.dto.UserDataDto;
import com.ip.kino.model.Uzytkownik;
import com.ip.kino.service.UserDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/private")
public class UserDataController {
    private final UserDataService userDataService;
    @GetMapping("/userdetails/{login}")
    ResponseEntity<UserDataDto> getUserByLogin(@PathVariable String login){
        return ResponseEntity.ok(userDataService.getUserByLogin(login));
    }
    @GetMapping("/userdetails")
    ResponseEntity<List<Uzytkownik>> getAllUsers(){
        return ResponseEntity.ok(userDataService.getAllUsers());
    }
}
