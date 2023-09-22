package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository
        extends JpaRepository<Music, Long> {
}
