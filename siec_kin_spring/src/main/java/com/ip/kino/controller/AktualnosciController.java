package com.ip.kino.controller;

import com.ip.kino.model.Aktualnosci;
import com.ip.kino.service.AktualnosciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AktualnosciController {
    private final AktualnosciService aktualnosciService;
    @Autowired
    public AktualnosciController(AktualnosciService aktualnosciService) {
        this.aktualnosciService = aktualnosciService;
    }

    @GetMapping("/aktualnosci")
    public List<Aktualnosci> getAllAktualnosci(){
        return aktualnosciService.getAllAktualnosci();
    }
}
