package com.ip.kino.controller;

import com.ip.kino.model.Zapowiedzi;
import com.ip.kino.service.ZapowiedziService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ZapowiedziController {
    private final ZapowiedziService zapowiedziService;
    @Autowired
    public ZapowiedziController(ZapowiedziService zapowiedziService) {
        this.zapowiedziService = zapowiedziService;
    }
//    @GetMapping("/zapowiedzi")
//    public List<Zapowiedzi> getAllZapowiedzi(){
//        return zapowiedziService.getAllZapowiedzi();
//    }
//    @GetMapping("/zapowiedzi/{id}")
//    public Zapowiedzi getZapowiedzById(@PathVariable Long id){
//        return zapowiedziService.getZapowiedzById(id);
//    }
}
