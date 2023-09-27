package com.ssafy.gogosing.dto.music.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

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

    private Long genreId;

    private String genreType;

    @Builder
    public MusicDetailResponseDto(Long musicId, String title, String singer, String lyricist, String composer, String songImg, String releaseDate, String lyric, String mrUrl, String musicUrl, String musicPlayTime, Long genreId, String genreType) {
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
        this.genreId = genreId;
        this.genreType = genreType;
    }
}
