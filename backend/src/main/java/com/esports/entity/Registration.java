package com.esports.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "registrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teamName;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "registration_players", joinColumns = @JoinColumn(name = "registration_id"))
    @Column(name = "player_ingame_id")
    private List<String> playerInGameIds;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User registeredBy;
}
