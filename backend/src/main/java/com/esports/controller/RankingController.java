package com.esports.controller;

import com.esports.entity.PlayerRank;
import com.esports.entity.TeamRank;
import com.esports.repository.PlayerRankRepository;
import com.esports.repository.TeamRankRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {

    private final TeamRankRepository teamRankRepository;
    private final PlayerRankRepository playerRankRepository;

    public RankingController(TeamRankRepository teamRankRepository, PlayerRankRepository playerRankRepository) {
        this.teamRankRepository = teamRankRepository;
        this.playerRankRepository = playerRankRepository;
    }

    @GetMapping("/teams")
    public ResponseEntity<List<TeamRank>> getTeamRankings() {
        return ResponseEntity.ok(teamRankRepository.findAllByOrderByRankAsc());
    }

    @GetMapping("/players")
    public ResponseEntity<List<PlayerRank>> getPlayerRankings() {
        return ResponseEntity.ok(playerRankRepository.findAllByOrderByRankAsc());
    }
}
