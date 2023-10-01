package com.ssafy.gogosing.dto.search.response;

import com.ssafy.gogosing.domain.music.Music;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchResponseDto {

    private Long musicId;

    private String singer;

    private String songImg;

    private String title;

    @Builder
    public SearchResponseDto(Music music) {
        this.musicId = music.getId();
        this.singer = music.getSinger();
        this.songImg = music.getSongImg();
        this.title = music.getTitle();
    }
}
