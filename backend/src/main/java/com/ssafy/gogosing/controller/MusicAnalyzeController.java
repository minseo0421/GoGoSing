package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.dto.music.request.VoiceMatchingListRequestDto;
import com.ssafy.gogosing.repository.UserRepository;
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
    private final UserRepository userRepository;

    @ApiOperation(value = "목소리 녹음 파일 저장")
    @PostMapping("")
    public ResponseEntity<?> saveVoice(@RequestParam("file") MultipartFile multipartFile,
                                            @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(musicAnalyzeService.saveVoice(multipartFile, userDetails));
    }

    @ApiOperation(value = "사용자의 음역대 분석 결과 반환")
    @PostMapping("/rangeResult")
    public ResponseEntity<?> getVoiceRangeAnalyzeResult(@RequestParam("file") MultipartFile multipartFile,
                                       @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        String voiceTempFile = musicAnalyzeService.saveVoiceTemp(multipartFile, userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(musicAnalyzeService.getVoiceRangeMatching(voiceTempFile, userDetails));
    }

    @ApiOperation(value = "사용자의 음역대에 맞는 노래 리스트 반환")
    @GetMapping("/rangeMusicList")
    public ResponseEntity<?> getVoiceRangeAnalyzeMusicList(@AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.status(HttpStatus.OK)
                .body(musicAnalyzeService.getVoiceRangeMatchingMusicList(userDetails));
    }

    @ApiOperation(value = "유사도 분석을 통한 목소리 녹음 파일 url과 유사한 노래 리스트 반환")
    @PostMapping("/voice")
    public ResponseEntity<?> getVoiceMatchingList(@RequestBody VoiceMatchingListRequestDto voiceMatchingListRequestDto) throws IOException {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(musicAnalyzeService.getVoiceMatchingList(voiceMatchingListRequestDto.getVoiceFile()));
    }

    @ApiOperation(value = "일단 임시로 영인님 드릴려고 만든 api")
    @GetMapping("/voiceFile")
    public ResponseEntity<?> getVoiceFile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        return ResponseEntity.ok()
                .body(user.getVoiceFile());
    }
}
