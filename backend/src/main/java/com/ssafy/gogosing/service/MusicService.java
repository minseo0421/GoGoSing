package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeMusic;
import com.ssafy.gogosing.dto.music.request.MusicLikeRequestDto;
import com.ssafy.gogosing.dto.music.response.MusicDetailResponseDto;
import com.ssafy.gogosing.repository.MusicRepository;
import com.ssafy.gogosing.repository.UserLikeMusicRepository;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MusicService {

    private final UserRepository userRepository;
    private final MusicRepository musicRepository;
    private final UserLikeMusicRepository userLikeMusicRepository;
    public static final Logger logger = LoggerFactory.getLogger(MusicService.class);

    @Transactional
    public void likeMusic(MusicLikeRequestDto musicLikeRequestDto, UserDetails userDetails) throws IOException {
        logger.info("*** likeMusic 메소드 호출");

        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
        {
            logger.info("*** 존재하지 않는 유저");
            return new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1);
        });

        Music music = musicRepository.findById(musicLikeRequestDto.getMusicId()).orElseThrow(() -> {
            logger.info("*** 존재하지 않는 노래");
            return new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1);
        });

        UserLikeMusic userLikeMusic = UserLikeMusic.builder().user(user).music(music).build();
        logger.info("*** 사용자 좋아요한 노래 데이터 save 시작");
        userLikeMusicRepository.save(userLikeMusic);
        logger.info("*** 사용자 좋아요한 노래 데이터 save 종료");
        logger.info("*** likeMusic 메소드 종료");
    }

    @Transactional
    public void unlikeMusic(MusicLikeRequestDto musicLikeRequestDto, UserDetails userDetails) {
        logger.info("*** unlikeMusic 메소드 호출");

        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
        {
            logger.info("*** 존재하지 않는 유저");
            return new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1);
        });

        Music music = musicRepository.findById(musicLikeRequestDto.getMusicId()).orElseThrow(() -> {
            logger.info("*** 존재하지 않는 노래");
            return new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1);
        });

        UserLikeMusic userLikeMusic = userLikeMusicRepository.findByUserAndMusic(user, music);
        logger.info("*** 사용자 좋아요한 노래 데이터 delete 시작");
        userLikeMusicRepository.delete(userLikeMusic);
        logger.info("*** 사용자 좋아요한 노래 데이터 delete 종료");
        logger.info("*** unlikeMusic 메소드 종료");
    }

    public MusicDetailResponseDto detail(Long musicId) {
        logger.info("*** detail 메소드 호출");
        Music music = musicRepository.findById(musicId).orElseThrow(() -> {
            logger.info("*** 존재하지 않는 노래");
            return new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1);
        });

        // 장르 정보 추가로 받기
        MusicDetailResponseDto musicDetailResponseDto = MusicDetailResponseDto.builder().musicId(music.getId()).title(music.getTitle()).singer(music.getSinger()).lyricist(music.getLyricist()).composer(music.getComposer()).songImg(music.getSongImg()).releaseDate(music.getReleaseDate()).lyric(music.getLyric()).mrUrl(music.getMrUrl()).musicUrl(music.getMusicUrl()).musicPlayTime(music.getMusicPlayTime()).build();

        logger.info("*** detail 메소드 종료");
        return musicDetailResponseDto;
    }
}
