package com.esports.repository;

import com.esports.entity.PlayerRank;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlayerRankRepository extends JpaRepository<PlayerRank, Long> {
    List<PlayerRank> findAllByOrderByRankAsc();
}
