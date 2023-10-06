package com.ssafy.gogosing.repository.SearchRepository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchRepository
        extends JpaRepository<Music, Long>, SearchCustomRepository {

    /**
     * JPQL 이용
     */
    @Query("SELECT m FROM Music m WHERE (m.singer = :keyword) ORDER BY m.viewCount DESC")
    List<Music> findBySinger(String keyword, Pageable pageable);

    /**
     * nativeSql 이용
     * Full-Text index 사용
     */
    @Query(value = "SELECT * FROM music WHERE MATCH(lyric) AGAINST(:keyword IN BOOLEAN MODE)",
            nativeQuery = true)
    List<Music> findAllByLyric(String keyword, Pageable pageable);
}
