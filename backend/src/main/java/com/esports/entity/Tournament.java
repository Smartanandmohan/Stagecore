package com.esports.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tournaments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String game;
    private String image;
    private String mode;
    private String format;
    private String prize;
    private String date;
    
    @Enumerated(EnumType.STRING)
    private TournamentStatus status; // LIVE, UPCOMING, COMPLETED

    public enum TournamentStatus {
        LIVE, UPCOMING, COMPLETED
    }
}
