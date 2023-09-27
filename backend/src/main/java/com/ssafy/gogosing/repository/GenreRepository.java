package com.ssafy.gogosing.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.gogosing.domain.music.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
	Optional<Genre> findById(Long genreId);
}
