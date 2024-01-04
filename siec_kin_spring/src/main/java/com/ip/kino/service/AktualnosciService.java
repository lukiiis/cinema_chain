package com.ip.kino.service;

import com.ip.kino.model.Aktualnosci;
import com.ip.kino.repository.AktualnosciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AktualnosciService {
    private final AktualnosciRepository aktualnosciRepository;
    @Autowired
    public AktualnosciService(AktualnosciRepository aktualnosciRepository) {
        this.aktualnosciRepository = aktualnosciRepository;
    }

    public List<Aktualnosci> getAllAktualnosci(){
        System.out.println(aktualnosciRepository.findAll());
        return aktualnosciRepository.findAll();
    }
    public Aktualnosci getAktualnosciById(Long id){
        return aktualnosciRepository.findById(id).orElse(null);
    }
}
