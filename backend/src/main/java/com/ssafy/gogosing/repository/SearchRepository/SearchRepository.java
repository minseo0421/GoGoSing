package com.ssafy.gogosing.repository.SearchRepository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchRepository
        extends JpaRepository<Music, Long>, SearchCustomRepository {
    @Query("SELECT m FROM Music m WHERE (m.singer = :keyword) ORDER BY m.releaseDate DESC")
    List<Music> findBySinger(String keyword);
}
