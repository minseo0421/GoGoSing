package com.ssafy.gogosing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.gogosing.domain.music.MusicGenre;

public interface MusicGenreRepository extends JpaRepository<MusicGenre, Long> {

	List<MusicGenre> findByGenreId(Long musicId);
	List<MusicGenre> findByMusicId(Long musicId);
}

