package com.ssafy.gogosing.dto.analyze.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoiceWaveMatchingResponseDto {

    private Long musicId;

    private String singer;

    private String songImg;

    private String title;

    @Builder
    public VoiceWaveMatchingResponseDto(Long musicId, String singer, String songImg, String title) {
        this.musicId = musicId;
        this.singer = singer;
        this.songImg = songImg;
        this.title = title;
    }
}
