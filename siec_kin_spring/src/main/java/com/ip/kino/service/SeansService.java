package com.ip.kino.service;

import com.ip.kino.model.Seans;
import com.ip.kino.repository.SeansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
@Service
public class SeansService {
    private final SeansRepository seansRepository;

    @Autowired
    public  SeansService(SeansRepository seansRepository){
        this.seansRepository = seansRepository;
    }
    public List<Seans> getAllSeans(){
        return seansRepository.findAll();
    }
    public List<Seans> getSeansById(Long id){
        return (List<Seans>) seansRepository.findById(id).orElse(null);
    }
    public List<Seans> findAllByKinoAndFilm(Long id, Long filmId){
        return seansRepository.findAllByKinoAndFilm(id, filmId);
    }

    public List<Seans> findAllByIdKina(Long KinoId){
        return seansRepository.findAllByIdKIna(KinoId);
    }
}
