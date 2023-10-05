package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.music.Genre;
import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.music.MusicGenre;
import com.ssafy.gogosing.domain.music.PopularChart;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeMusic;
import com.ssafy.gogosing.dto.genre.response.MusicGenreResponseDto;
import com.ssafy.gogosing.dto.music.request.MusicLikeRequestDto;
import com.ssafy.gogosing.dto.music.response.LikeMusicListResponseDto;
import com.ssafy.gogosing.dto.music.response.MusicDetailResponseDto;
import com.ssafy.gogosing.dto.music.response.MusicResponseDto;
import com.ssafy.gogosing.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.lang.reflect.Array;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MusicService {

    private final UserRepository userRepository;
    private final MusicRepository musicRepository;
    private final UserLikeMusicRepository userLikeMusicRepository;
    private final PopularChartRepository popularChartRepository;
    private final MusicGenreRepository musicGenreRepository;
    private final GenreRepository genreRepository;

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

    public List<LikeMusicListResponseDto> likeMusicList(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        List<UserLikeMusic> userLikeMusicList = userLikeMusicRepository.findByUserId(user.getId());

        List<LikeMusicListResponseDto> result = new ArrayList<>();

        for (UserLikeMusic userLikeMusic : userLikeMusicList) {
            Music music = musicRepository.findById(userLikeMusic.getMusic().getId())
                    .orElseThrow(() -> new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1));

            LikeMusicListResponseDto likeMusicListResponseDto = LikeMusicListResponseDto.builder()
                    .musicId(music.getId())
                    .title(music.getTitle())
                    .singer(music.getSinger())
                    .songImg(music.getSongImg())
                    .build();

            result.add(likeMusicListResponseDto);
        }

        return result;
    }

    public List<LikeMusicListResponseDto> recommendListMusicOnLike(UserDetails userDetails) {
        logger.info("*** recommendListMusicOnLike 메소드 호출");
        User user = userRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        List<Object[]> objectMusic = userLikeMusicRepository.recommendListOnLike(user.getId());

        List<LikeMusicListResponseDto> result = new ArrayList<>();
        for (Object[] row : objectMusic) {
            LikeMusicListResponseDto likeMusicListResponseDto = LikeMusicListResponseDto.builder()
                .musicId(((BigInteger) row[0]).longValue()) // BigInteger를 long으로 변환
                .title((String) row[1])
                .singer((String) row[2])
                .songImg((String) row[3])
                .build();
            result.add(likeMusicListResponseDto);
        }

        return result;
    }

    @Transactional
    public MusicDetailResponseDto detail(Long musicId) {
        logger.info("*** detail 메소드 호출");
        Music music = musicRepository.findById(musicId).orElseThrow(() -> {
            logger.info("*** 존재하지 않는 노래");
            return new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1);
        });
        List<MusicGenreResponseDto> genreInfo = new ArrayList<>();
        List<MusicGenre> musicGenreList = musicGenreRepository.findByMusicId(music.getId());
        if (musicGenreList.isEmpty()) {
            logger.info("*** 노래의 장르가 존재하지 않음 musicId : " + music.getId());
        }
        for (MusicGenre musicGenre : musicGenreList) {
            MusicGenreResponseDto musicGenreResponseDto = MusicGenreResponseDto.builder()
                    .genreId(musicGenre.getGenre().getId())
                    .genreType(musicGenre.getGenre().getType()).build();
            genreInfo.add(musicGenreResponseDto);
        }
        MusicDetailResponseDto musicDetailResponseDto = MusicDetailResponseDto.builder()
                .musicId(music.getId())
                .title(music.getTitle())
                .singer(music.getSinger())
                .lyricist(music.getLyricist())
                .composer(music.getComposer())
                .songImg(music.getSongImg())
                .releaseDate(music.getReleaseDate())
                .lyric(music.getLyric())
                .mrUrl(music.getMrUrl())
                .musicUrl(music.getMusicUrl())
                .musicPlayTime(music.getMusicPlayTime())
                .viewCount(music.getViewCount())
                .genreInfo(genreInfo).build();
        incrementViewCount(music.getId());
        logger.info("*** detail 메소드 종료");
        return musicDetailResponseDto;
    }

    public void incrementViewCount(Long musicId) {
        logger.info("*** incrementViewCount 메소드 호출");
        Music music = musicRepository.findById(musicId).orElseThrow(() -> {
            logger.info("*** 존재하지 않는 노래");
            return new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1);
        });
        music.changeViewCount(music.getViewCount() + 1);
        musicRepository.save(music);
        logger.info("*** incrementViewCount 메소드 종료");
    }

    public List<LikeMusicListResponseDto> popularChart() {
        logger.info("*** popularChart 메소드 호출");
        List<PopularChart> popularChartList = popularChartRepository.findAllByOrderByRankingAsc();
        List<LikeMusicListResponseDto> popularChart = new ArrayList<>();
        for (PopularChart chart : popularChartList) {
            Optional<Music> optionalMusic = musicRepository.findById(chart.getMusic().getId());

            if (optionalMusic.isEmpty()) {
                logger.info("*** 존재하지 않는 노래 musicId : " + chart.getMusic().getId() + ", ranking : " + chart.getRanking());
                continue;
            }

            Music music = optionalMusic.get();
            List<LikeMusicListResponseDto> genreInfo = new ArrayList<>();
            List<MusicGenre> musicGenreList = musicGenreRepository.findByMusicId(music.getId());
            if (musicGenreList.isEmpty()) {
                logger.info("*** 노래의 장르가 존재하지 않음 musicId : " + music.getId());
            }
            LikeMusicListResponseDto likeMusicListResponseDto = LikeMusicListResponseDto.builder()
                    .musicId(music.getId())
                    .title(music.getTitle())
                    .singer(music.getSinger())
                    .songImg(music.getSongImg()).build();
            popularChart.add(likeMusicListResponseDto);
        }
        logger.info("*** popularChart 메소드 종료");
        return popularChart;

    }


}
