package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicRepository
        extends JpaRepository<Music, Long> {
    Optional<Music> findById(Long musicId);
}
