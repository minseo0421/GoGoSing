package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.MusicGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicGenreRepository
        extends JpaRepository<MusicGenre, Long> {
    List<MusicGenre> findByMusicId(Long musicId);
}
