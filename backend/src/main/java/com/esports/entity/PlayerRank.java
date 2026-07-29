package com.esports.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "player_rankings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayerRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rank;
    private String name;
    private String team;
    private String score; // e.g. MVP rating (9.8, etc.)
}
