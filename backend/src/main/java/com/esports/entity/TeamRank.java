package com.esports.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "team_rankings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rank;
    private String name;
    private String score; // e.g. points
}
