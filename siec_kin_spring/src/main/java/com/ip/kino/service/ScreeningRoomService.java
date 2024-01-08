package com.ip.kino.service;

import com.ip.kino.model.ScreeningRoom;
import com.ip.kino.repository.ScreeningRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ScreeningRoomService {
    private final ScreeningRoomRepository salaRepository;

    @Autowired
    public ScreeningRoomService(ScreeningRoomRepository salaRepository){
        this.salaRepository = salaRepository;
    }

    public List<ScreeningRoom> getAllSale(){return salaRepository.findAll();}
//    public Sala getSalaById(Long id){
//        return salaRepository.findSalaById(id);
//    }

    public ScreeningRoom getSalaById(Long id){
        return salaRepository.findById(id).orElse(null);
    }
}