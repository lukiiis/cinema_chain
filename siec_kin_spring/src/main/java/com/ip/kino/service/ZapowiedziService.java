package com.ip.kino.service;

import com.ip.kino.model.Zapowiedzi;
import com.ip.kino.repository.ZapowiedziRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZapowiedziService {
    private final ZapowiedziRepository zapowiedziRepository;
    @Autowired
    public ZapowiedziService(ZapowiedziRepository zapowiedziRepository) {
        this.zapowiedziRepository = zapowiedziRepository;
    }

    public List<Zapowiedzi> getAllZapowiedzi(){
        return zapowiedziRepository.findAll();
    }

    public Zapowiedzi getZapowiedzById(Long id){
        return zapowiedziRepository.findById(id).orElse(null);
    }
}
