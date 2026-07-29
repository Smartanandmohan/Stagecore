package com.esports.service;

import com.esports.dto.RegistrationRequest;
import com.esports.entity.Registration;
import com.esports.entity.Tournament;
import com.esports.entity.User;
import com.esports.repository.RegistrationRepository;
import com.esports.repository.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {

    private final TournamentRepository tournamentRepository;
    private final RegistrationRepository registrationRepository;

    public TournamentService(TournamentRepository tournamentRepository, RegistrationRepository registrationRepository) {
        this.tournamentRepository = tournamentRepository;
        this.registrationRepository = registrationRepository;
    }

    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    public Tournament getTournamentById(Long id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found."));
    }

    public Registration registerSquad(Long tournamentId, RegistrationRequest request, User user) {
        Tournament tournament = getTournamentById(tournamentId);

        if (tournament.getStatus() != Tournament.TournamentStatus.UPCOMING) {
            throw new RuntimeException("Registrations are closed or already active.");
        }

        Registration registration = Registration.builder()
                .teamName(request.getTeamName())
                .playerInGameIds(request.getPlayerInGameIds())
                .tournament(tournament)
                .registeredBy(user)
                .build();

        return registrationRepository.save(registration);
    }
}
