package com.ip.kino.controller;

import com.ip.kino.model.ScreeningRoom;
import com.ip.kino.service.ScreeningRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ScreeningRoomController {
    private final ScreeningRoomService screeningRoomService;

    @Autowired
    public ScreeningRoomController(ScreeningRoomService salaService){this.screeningRoomService = salaService;}

    @GetMapping("/screeningRoom")
    public List<ScreeningRoom> getAllScreeningRooms(){
        return screeningRoomService.getAllScreeningRooms();
    }

    @GetMapping("/screeningRoom/{id}")
    public ScreeningRoom getScreeningRoomById(@PathVariable Long id){return screeningRoomService.getScreeningRoomById(id);}
}