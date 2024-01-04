package com.ip.kino.service;

import com.ip.kino.model.Miejsca;
import com.ip.kino.repository.MiejscaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MiejscaService {
    private final MiejscaRepository miejsceRepository;

    @Autowired
    public MiejscaService(MiejscaRepository miejsceRepository){
        this.miejsceRepository = miejsceRepository;
    }
    public List<Miejsca> getAllMiejsca(){
        return miejsceRepository.findAll();
    }
    public List<Miejsca> getAllMiejscaByIdSali(Long idSali){
        return miejsceRepository.findAllMiejscaByIdSali(idSali);
    }
}
