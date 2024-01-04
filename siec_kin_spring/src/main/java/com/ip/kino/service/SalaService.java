package com.ip.kino.service;

import com.ip.kino.model.Sala;
import com.ip.kino.model.Seans;
import com.ip.kino.repository.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SalaService {
    private final SalaRepository salaRepository;

    @Autowired
    public SalaService(SalaRepository salaRepository){
        this.salaRepository = salaRepository;
    }

    public List<Sala> getAllSale(){return salaRepository.findAll();}
//    public Sala getSalaById(Long id){
//        return salaRepository.findSalaById(id);
//    }

    public Sala getSalaById(Long id){
        return salaRepository.findById(id).orElse(null);
    }
}
