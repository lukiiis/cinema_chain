package com.ip.kino.service;

import com.ip.kino.model.ScreeningRoom;
import com.ip.kino.repository.ScreeningRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ScreeningRoomService {
    private final ScreeningRoomRepository screeningRoomRepository;

    @Autowired
    public ScreeningRoomService(ScreeningRoomRepository screeningRoomRepository){
        this.screeningRoomRepository = screeningRoomRepository;
    }

    public List<ScreeningRoom> getAllScreeningRooms(){return screeningRoomRepository.findAll();}
//    public Sala getSalaById(Long id){
//        return salaRepository.findSalaById(id);
//    }

    public ScreeningRoom getScreeningRoomById(Long id){
        return screeningRoomRepository.findById(id).orElse(null);
    }
}