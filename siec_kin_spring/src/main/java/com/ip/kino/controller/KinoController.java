package com.ip.kino.controller;

import com.ip.kino.model.Kino;
import com.ip.kino.repository.KinoRepository;
import com.ip.kino.service.KinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class KinoController {

    private final KinoService kinoService;
    @Autowired
    public KinoController(KinoService kinoService){
        this.kinoService = kinoService;
    }

    @GetMapping("/kino")
    public List<Kino> getAllKino(){
        return kinoService.getAllKino();
    }
}
