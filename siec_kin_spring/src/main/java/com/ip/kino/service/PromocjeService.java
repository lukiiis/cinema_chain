package com.ip.kino.service;

import com.ip.kino.model.Promocje;
import com.ip.kino.repository.PromocjeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromocjeService {
    private final PromocjeRepository promocjeRepository;
    @Autowired
    public PromocjeService(PromocjeRepository promocjeRepository) {
        this.promocjeRepository = promocjeRepository;
    }
    public List<Promocje> getAllPromocje(){
        return promocjeRepository.findAll();
    }
    public Promocje getPromocjeById(Long id){
        return promocjeRepository.findById(id).orElse(null);
    }
    //zwraca tylko te promocje, ktore sa aktywne
    public List<Promocje> getAllValidPromocje(){
        return promocjeRepository.findAllValidPromocje();
    }
}
