package com.ssafy.gogosing.repository.AnalyzeRepository;

import com.ssafy.gogosing.domain.analyze.MusicRangeAnalyze;
import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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


    @Query("SELECT m FROM Music m WHERE m.id IN :musicIdList ORDER BY m.viewCount DESC")
    List<Music> musicOrderByViewCount(List<Long> musicIdList);
}
