package com.ip.kino.controller;

import com.ip.kino.model.Sala;
import com.ip.kino.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class SalaController {
    private final SalaService salaService;

    @Autowired
    public SalaController(SalaService salaService){this.salaService = salaService;}

    @GetMapping("/sala")
    public List<Sala> getAllSale(){
        return salaService.getAllSale();
    }

    @GetMapping("/sala/{id}")
    public Sala getSalaById(@PathVariable Long id){return salaService.getSalaById(id);}
}
