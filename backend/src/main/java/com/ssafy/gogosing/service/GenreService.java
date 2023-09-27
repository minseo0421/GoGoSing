package com.ssafy.gogosing.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.gogosing.domain.music.Genre;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeGenre;
import com.ssafy.gogosing.dto.genre.request.GenreRequestDto;
import com.ssafy.gogosing.repository.GenreRepository;
import com.ssafy.gogosing.repository.UserLikeGenreRepository;
import com.ssafy.gogosing.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GenreService {
	private final UserRepository userRepository;
	private final GenreRepository genreRepository;
	private final UserLikeGenreRepository userLikeGenreRepository;

	@Transactional
	public void registGenre(GenreRequestDto genreRequestDto) {
		User user = userRepository.findById(genreRequestDto.getUserId())
			.orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));
		List<Long> genres = genreRequestDto.getGenres();
		for (Long genre : genres) {
			Genre findGenre = genreRepository.findById(genre).orElseThrow();
			UserLikeGenre userLikeGenre = UserLikeGenre.builder()
				.user(user)
				.genre(findGenre)
				.build();
			userLikeGenreRepository.save(userLikeGenre);
		}
	}

	public List<Long> findGenres(Long userId) {
		List<UserLikeGenre> userLikeGenres = userLikeGenreRepository.findByUserId(userId);

		return userLikeGenres.stream()
			.map(u -> u.getGenre().getId())
			.collect(Collectors.toList());
	}

	@Transactional
	public void updateGenre(GenreRequestDto genreRequestDto) {
		User user = userRepository.findById(genreRequestDto.getUserId())
			.orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

		// 사용자의 좋아하는 장르를 모두 삭제
		userLikeGenreRepository.deleteByUser(user);
		registGenre(genreRequestDto);
	}
}