package com.esports.config;

import com.esports.entity.*;
import com.esports.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TournamentRepository tournamentRepository;
    private final MatchRepository matchRepository;
    private final TeamRankRepository teamRankRepository;
    private final PlayerRankRepository playerRankRepository;
    private final NewsRepository newsRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, 
                          TournamentRepository tournamentRepository,
                          MatchRepository matchRepository, 
                          TeamRankRepository teamRankRepository,
                          PlayerRankRepository playerRankRepository,
                          NewsRepository newsRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tournamentRepository = tournamentRepository;
        this.matchRepository = matchRepository;
        this.teamRankRepository = teamRankRepository;
        this.playerRankRepository = playerRankRepository;
        this.newsRepository = newsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Dummy data seeding removed entirely.
    }
}
