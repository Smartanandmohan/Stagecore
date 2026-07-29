package com.esports.controller;

import com.esports.dto.RegistrationRequest;
import com.esports.entity.Registration;
import com.esports.entity.Tournament;
import com.esports.entity.User;
import com.esports.service.AuthService;
import com.esports.service.TournamentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentService tournamentService;
    private final AuthService authService;

    public TournamentController(TournamentService tournamentService, AuthService authService) {
        this.tournamentService = tournamentService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<Tournament>> getTournaments() {
        return ResponseEntity.ok(tournamentService.getAllTournaments());
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<?> registerSquad(@PathVariable Long id, @RequestBody RegistrationRequest request) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = authService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found."));

            Registration reg = tournamentService.registerSquad(id, request, user);
            return ResponseEntity.ok(Map.of("message", "Registration successful", "registrationId", reg.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
