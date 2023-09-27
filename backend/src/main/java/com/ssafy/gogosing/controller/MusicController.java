package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.music.request.MusicLikeRequestDto;
import com.ssafy.gogosing.service.MusicService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/music")
public class MusicController {

    private final MusicService musicService;

    @ApiOperation(value = "유저 노래 좋아요")
    @PostMapping("/like")
    public ResponseEntity<?> likeMusic(@Valid @RequestBody MusicLikeRequestDto musicLikeRequestDto,
                                       @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        musicService.likeMusic(musicLikeRequestDto, userDetails);
        return ResponseEntity.ok().body("");
    }

    @ApiOperation(value = "유저 노래 좋아요 취소")
    @DeleteMapping("/like")
    public ResponseEntity<?> unlikeMusic(@Valid @RequestBody MusicLikeRequestDto musicLikeRequestDto,
                                       @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        musicService.unlikeMusic(musicLikeRequestDto, userDetails);
        return ResponseEntity.ok().body("");
    }

    @ApiOperation(value = "노래 상세정보")
    @GetMapping("/detail/{musicId}")
    public ResponseEntity<?> detail(@PathVariable("musicId") Long musicId) throws Exception {
        return ResponseEntity.ok().body(musicService.detail(musicId));
    }

}
