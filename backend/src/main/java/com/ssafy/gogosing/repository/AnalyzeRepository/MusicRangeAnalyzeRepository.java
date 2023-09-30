package com.ssafy.gogosing.repository.AnalyzeRepository;

import com.ssafy.gogosing.domain.analyze.MusicRangeAnalyze;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRangeAnalyzeRepository
        extends JpaRepository<MusicRangeAnalyze, Long>,
        MusicRangeAnalyzeCustomRepository
//        ,QuerydslPredicateExecutor<MusicRangeAnalyze>
{

//    @Query("SELECT mra FROM MusicRangeAnalyze mra " +
//            "WHERE mra.maxPitch < :maxPitch " +
//            "ORDER BY mra.maxPitch DESC, mra.musicId")
////    @Query("SELECT e FROM MusicRangeAnalyze e WHERE e.maxPitch < :maxPitch")
//    Long findMatchingListByMaxPitch(@Param("maxPitch") double maxPitch);
}
