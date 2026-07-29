package com.esports.controller;

import com.esports.entity.NewsArticle;
import com.esports.repository.NewsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsRepository newsRepository;

    public NewsController(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @GetMapping
    public ResponseEntity<List<NewsArticle>> getNews() {
        return ResponseEntity.ok(newsRepository.findAll());
    }
}
