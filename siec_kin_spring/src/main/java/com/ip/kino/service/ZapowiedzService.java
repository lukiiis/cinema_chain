package com.ip.kino.service;

import com.ip.kino.model.Zapowiedz;
import com.ip.kino.repository.ZapowiedzRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZapowiedzService {
    private final ZapowiedzRepository zapowiedzRepository;
    @Autowired
    public ZapowiedzService(ZapowiedzRepository zapowiedzRepository) {
        this.zapowiedzRepository = zapowiedzRepository;
    }

    public List<Zapowiedz> getAllZapowiedzi(){
        return zapowiedzRepository.findAll();
    }

    public Zapowiedz getZapowiedzById(Long id){
        return zapowiedzRepository.findById(id).orElse(null);
    }
}
