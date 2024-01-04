package com.ip.kino.controller;

import com.ip.kino.model.Miejsca;
import com.ip.kino.model.Sala;
import com.ip.kino.service.MiejscaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MiejscaController {

    private  final MiejscaService miejscaService;

    @Autowired
    public MiejscaController(MiejscaService miejscaService){this.miejscaService = miejscaService;}


    @GetMapping("/miejsca")
    public List<Miejsca> getAllMiejsca(){
        return miejscaService.getAllMiejsca();
    }
    @GetMapping("/miejsca/{id}")
    public List<Miejsca> getMiejscaByIdSali(@PathVariable Long idSali){
        return miejscaService.getAllMiejscaByIdSali(idSali);
    }
}
