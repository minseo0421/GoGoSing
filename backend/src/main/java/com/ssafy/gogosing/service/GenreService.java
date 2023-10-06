package com.ssafy.gogosing.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.gogosing.domain.music.Genre;
import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.music.MusicGenre;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeGenre;
import com.ssafy.gogosing.dto.genre.request.GenreRequestDto;
import com.ssafy.gogosing.dto.music.response.GenreMusicListResponseDto;
import com.ssafy.gogosing.dto.music.response.LikeMusicListResponseDto;
import com.ssafy.gogosing.repository.GenreRepository;
import com.ssafy.gogosing.repository.MusicGenreRepository;
import com.ssafy.gogosing.repository.MusicRepository;
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
	private final MusicGenreRepository musicGenreRepository;
	private final MusicRepository musicRepository;
	public static final Logger logger = LoggerFactory.getLogger(MusicService.class);

	@Transactional
	public void registGenre(GenreRequestDto genreRequestDto, UserDetails userDetails) {
		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
		{
			logger.info("*** 존재하지 않는 유저");
			return new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1);
		});
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

	public List<Long> findGenres(UserDetails userDetails) {
		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
		List<UserLikeGenre> userLikeGenres = userLikeGenreRepository.findByUserId(user.getId());

		return userLikeGenres.stream()
			.map(u -> u.getGenre().getId())
			.collect(Collectors.toList());
	}

	@Transactional
	public void updateGenre(GenreRequestDto genreRequestDto, UserDetails userDetails) {
		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
		{
			logger.info("*** 존재하지 않는 유저");
			return new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1);
		});
		// 사용자의 좋아하는 장르를 모두 삭제
		userLikeGenreRepository.deleteByUser(user);
		registGenre(genreRequestDto, userDetails);
	}

	public List<LikeMusicListResponseDto> findGenreList(Long genreId) {
		logger.info("*** findGenreList 메소드 호출");
		List<Music> musicList = musicRepository.findMusicByGenreId(genreId);

		List<LikeMusicListResponseDto> result = new ArrayList<>();
		for (Music music : musicList) {
			result.add(
				new LikeMusicListResponseDto(music.getId(), music.getSinger(), music.getSongImg(), music.getTitle()));
		}
		return result;
	}

	public List<LikeMusicListResponseDto> recommendListMusicOnLike(UserDetails userDetails) {
		logger.info("*** recommendListOnGenre 메소드 호출");
		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
		List<UserLikeGenre> userLikeGenres = userLikeGenreRepository.findByUserId(user.getId());
		List<LikeMusicListResponseDto> result = new ArrayList<>();

		// 장르 선택했는지
		if (userLikeGenres.isEmpty()) {
			// 선택 안했을 때는 인기 10개
			List<Music> musicList = musicRepository.findTopByPick();
			for (Music music : musicList) {
				result.add(
					new LikeMusicListResponseDto(music.getId(), music.getSinger(), music.getSongImg(),
						music.getTitle()));
			}
			return result;
		} else {
			// 좋아하는 장르 선택했을 때는 장르 기반으로 10개
			List<Music> musicList = musicRepository.findListByPick(findGenres(userDetails));
			for (Music music : musicList) {
				result.add(new LikeMusicListResponseDto(music.getId(), music.getSinger(), music.getSongImg(),
					music.getTitle()));
			}
			return result;
		}
	}

	public List<LikeMusicListResponseDto> recommendListMusic() {
		logger.info("*** recommendListMusic 메소드 호출");
		List<LikeMusicListResponseDto> result = new ArrayList<>();

		List<Music> musicList = musicRepository.findTopByPick();
		for (Music music : musicList) {
			result.add(
				new LikeMusicListResponseDto(music.getId(), music.getSinger(), music.getSongImg(), music.getTitle()));
		}
		return result;
	}
}