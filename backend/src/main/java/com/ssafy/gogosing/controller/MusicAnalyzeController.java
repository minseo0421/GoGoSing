package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.music.request.VoiceMatchingListRequestDto;
import com.ssafy.gogosing.service.MusicAnalyzeService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/music/analyze")
public class MusicAnalyzeController {

    private final MusicAnalyzeService musicAnalyzeService;

    @ApiOperation(value = "목소리 녹음 파일 저장")
    @PostMapping("")
    public ResponseEntity<?> saveVoice(@RequestParam("file") MultipartFile multipartFile,
                                            @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(musicAnalyzeService.saveVoice(multipartFile, userDetails));
    }

    @ApiOperation(value = "유사도 분석을 통한 목소리 녹음 파일 url과 유사한 노래 리스트 반환")
    @PostMapping("/voice")
    public ResponseEntity<?> getVoiceMatchingList(@RequestBody VoiceMatchingListRequestDto voiceMatchingListRequestDto) throws IOException {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(musicAnalyzeService.getVoiceMatchingList(voiceMatchingListRequestDto.getVoiceFile()));
    }
}
