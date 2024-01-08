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
    private final ScreeningRoomService salaService;

    @Autowired
    public ScreeningRoomController(ScreeningRoomService salaService){this.salaService = salaService;}

    @GetMapping("/sala")
    public List<ScreeningRoom> getAllSale(){
        return salaService.getAllSale();
    }

    @GetMapping("/sala/{id}")
    public ScreeningRoom getSalaById(@PathVariable Long id){return salaService.getSalaById(id);}
}