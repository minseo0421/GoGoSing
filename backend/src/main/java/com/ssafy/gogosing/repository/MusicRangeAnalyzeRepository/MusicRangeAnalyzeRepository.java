package com.ssafy.gogosing.repository.MusicRangeAnalyzeRepository;

import com.ssafy.gogosing.domain.music.MusicRangeAnalyze;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

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
