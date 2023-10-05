package com.ssafy.gogosing.dto.music.response;

import com.ssafy.gogosing.dto.genre.response.MusicGenreResponseDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicResponseDto {

    private Long musicId;

    private String title;

    private String singer;

    private String songImg;

    private List<MusicGenreResponseDto> genreInfo;

    private Long viewCount;

    @Builder

    public MusicResponseDto(Long musicId, String title, String singer, String songImg, List<MusicGenreResponseDto> genreInfo, Long viewCount) {
        this.musicId = musicId;
        this.title = title;
        this.singer = singer;
        this.songImg = songImg;
        this.genreInfo = genreInfo;
        this.viewCount = viewCount;
    }
}
