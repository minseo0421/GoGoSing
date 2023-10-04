package com.ssafy.gogosing.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.gogosing.domain.music.MusicGenre;

public interface MusicGenreRepository extends JpaRepository<MusicGenre, Long> {
	@Query("SELECT mg FROM MusicGenre mg WHERE mg.genre.id = :genreId")
	List<MusicGenre> findByGenreId(@Param("genreId") Long genreId, Pageable pageable);

	List<MusicGenre> findByMusicId(Long musicId);
}

