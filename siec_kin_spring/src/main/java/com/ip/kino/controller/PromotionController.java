package com.ip.kino.controller;

import com.ip.kino.model.Promotion;
import com.ip.kino.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PromotionController {

    private final PromotionService promotionService;
    @GetMapping("/promocje")
    public List<Promotion> getAllValidPromotions(){
        return promotionService.getAllValidPromotions();
    }
    @GetMapping("/promocje/{id}")
    public Promotion getPromotionById(@PathVariable Long id){
        return promotionService.getPromotionById(id);
    }
}
