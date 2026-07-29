package com.esports.controller;

import com.esports.entity.Match;
import com.esports.repository.MatchRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchRepository matchRepository;

    public MatchController(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @GetMapping
    public ResponseEntity<List<Match>> getMatches() {
        return ResponseEntity.ok(matchRepository.findAll());
    }
}
