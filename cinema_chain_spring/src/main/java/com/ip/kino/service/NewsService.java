package com.ip.kino.service;

import com.ip.kino.model.News;
import com.ip.kino.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsRepository newsRepository;
    public List<News> getAllNews(){
        return newsRepository.findAll();
    }
    public News getNewsById(Long id){
        return newsRepository.findById(id).orElse(null);
    }
}
