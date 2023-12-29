package com.ip.kino.service;

import com.ip.kino.model.Promotion;
import com.ip.kino.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;
    public List<Promotion> getAllPromotions(){
        return promotionRepository.findAll();
    }
    public Promotion getPromotionById(Long id){
        return promotionRepository.findById(id).orElse(null);
    }
    //zwraca tylko te promocje, ktore sa aktywne
    public List<Promotion> getAllValidPromotions(){
        return promotionRepository.findAllValidPromotions();
    }
}
