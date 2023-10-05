package com.ssafy.gogosing.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.gogosing.dto.genre.request.GenreRequestDto;
import com.ssafy.gogosing.dto.music.response.GenreMusicListResponseDto;
import com.ssafy.gogosing.dto.music.response.LikeMusicListResponseDto;
import com.ssafy.gogosing.service.GenreService;

import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/genre")
public class GenreController {
	private final GenreService genreService;

	@PostMapping
	@ApiOperation(value = "좋아하는 장르 선택")
	public ResponseEntity<?> registGenre(@Valid @RequestBody GenreRequestDto genreRequestDto,
		@AuthenticationPrincipal UserDetails userDetails) throws Exception{
		genreService.registGenre(genreRequestDto, userDetails);
		return ResponseEntity.ok().body("");
	}

	@GetMapping
	@ApiOperation(value = "사용자 장르 조회")
	public List<Long> findGenres(@AuthenticationPrincipal UserDetails userDetails) {
		return genreService.findGenres(userDetails);
	}

	@PostMapping("/update")
	@ApiOperation(value = "장르 수정")
	public ResponseEntity<?> updateGenre(@Valid @RequestBody GenreRequestDto genreRequestDto,
		@AuthenticationPrincipal UserDetails userDetails) throws Exception{
		genreService.updateGenre(genreRequestDto, userDetails);
		return ResponseEntity.ok().body("");
	}

	@GetMapping("/musicList")
	@ApiOperation(value = "장르별 노래 리스트")
	public ResponseEntity<?> findGenreList(@RequestParam("genreId") Long genreId) throws Exception {
		List<LikeMusicListResponseDto> result = genreService.findGenreList(genreId);
		return ResponseEntity.ok().body(result);
	}

	@ApiOperation(value = "유저 노래 좋아요 기반 추천 리스트")
	@GetMapping("/like/list")
	public ResponseEntity<?> recommendListMusicOnLike(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
		return ResponseEntity.ok().body(genreService.recommendListMusicOnLike(userDetails));
	}
}
