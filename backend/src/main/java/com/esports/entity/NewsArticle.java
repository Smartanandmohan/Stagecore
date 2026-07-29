package com.esports.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "news_articles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String date;
    private String readTime;
    
    @Column(columnDefinition = "TEXT")
    private String desc;
}
