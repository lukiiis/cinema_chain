package com.ip.kino.controller;

import com.ip.kino.model.News;
import com.ip.kino.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/public")
public class NewsController {
    private final NewsService newsService;

    @GetMapping("/news")
    public List<News> getAllNews(){
        return newsService.getAllNews();
    }

    @GetMapping("/new/{id}")
    public News getNewsById(@PathVariable Long id){
        return newsService.getNewsById(id);
    }
}
