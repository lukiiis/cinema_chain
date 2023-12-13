package com.ip.kino.controller;

import com.ip.kino.model.Promocje;
import com.ip.kino.service.PromocjeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/v1")
public class PromocjeController {
    private final PromocjeService promocjeService;

    public PromocjeController(PromocjeService promocjeService) {
        this.promocjeService = promocjeService;
    }

    @GetMapping("/promocje")
    public List<Promocje> getAllValidPromocje(){
        return promocjeService.getAllValidPromocje();
    }
    @GetMapping("/promocje/{id}")
    public Promocje getPromocjeById(@PathVariable Long id){
        return promocjeService.getPromocjeById(id);
    }
}
