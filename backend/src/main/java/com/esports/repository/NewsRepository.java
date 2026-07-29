package com.esports.repository;

import com.esports.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<NewsArticle, Long> {
}
