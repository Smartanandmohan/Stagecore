package com.esports.repository;

import com.esports.entity.TeamRank;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamRankRepository extends JpaRepository<TeamRank, Long> {
    List<TeamRank> findAllByOrderByRankAsc();
}
