package com.ssafy.gogosing.dto.music.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicResponseDto {

    private Long musicId;

    private String title;

    private String singer;

    private String songImg;

    private Long genreId;

    private String genreType;

    @Builder
    public MusicResponseDto(Long musicId, String title, String singer, String songImg, Long genreId, String genreType) {
        this.musicId = musicId;
        this.title = title;
        this.singer = singer;
        this.songImg = songImg;
        this.genreId = genreId;
        this.genreType = genreType;
    }
}
