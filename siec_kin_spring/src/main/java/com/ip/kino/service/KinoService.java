package com.ip.kino.service;


import com.ip.kino.model.Kino;
import com.ip.kino.repository.KinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class KinoService {
    private final KinoRepository kinoRepository;
    @Autowired
    public  KinoService(KinoRepository kinoRepository){
        this.kinoRepository = kinoRepository;
    }
    public List<Kino> getAllKino(){
        return kinoRepository.findAll();
    }

}
