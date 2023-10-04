package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MusicRepository
        extends JpaRepository<Music, Long> {
    Optional<Music> findById(Long musicId);
    @Query("SELECT m FROM MusicGenre mg INNER JOIN Music m ON mg.music.id = m.id WHERE mg.genre.id = :genreId ORDER BY m.viewCount DESC")
    List<Music> findMusicByGenreId(Long genreId);
}
