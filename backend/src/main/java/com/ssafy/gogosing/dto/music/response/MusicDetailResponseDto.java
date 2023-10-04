package com.ssafy.gogosing.dto.music.response;

import com.ssafy.gogosing.dto.genre.response.MusicGenreResponseDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicDetailResponseDto {

    private Long musicId;

    private String title;

    private String singer;

    private String lyricist;

    private String composer;

    private String songImg;

    private String releaseDate;

    private String lyric;

    private String mrUrl;

    private String musicUrl;

    private String musicPlayTime;

    private List<MusicGenreResponseDto> genreInfo;

    private Long viewCount;

    @Builder
    public MusicDetailResponseDto(Long musicId, String title, String singer, String lyricist, String composer,
        String songImg, String releaseDate, String lyric, String mrUrl, String musicUrl, String musicPlayTime,
        List<MusicGenreResponseDto> genreInfo, Long viewCount) {
        this.musicId = musicId;
        this.title = title;
        this.singer = singer;
        this.lyricist = lyricist;
        this.composer = composer;
        this.songImg = songImg;
        this.releaseDate = releaseDate;
        this.lyric = lyric;
        this.mrUrl = mrUrl;
        this.musicUrl = musicUrl;
        this.musicPlayTime = musicPlayTime;
        this.genreInfo = genreInfo;
        this.viewCount = viewCount;
    }
}
