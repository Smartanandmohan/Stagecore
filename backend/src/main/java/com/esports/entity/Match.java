package com.esports.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String team1;
    private String team2;
    private Integer score1;
    private Integer score2;
    private String status; // LIVE, UPCOMING, COMPLETED
    private String game;
    private String stage;
    private String time;
    private String streamUrl;
}
