package com.ssafy.gogosing.dto.music.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoiceRangeMatchingResponseDto {

    private String voiceRangeHighest;

    private String voiceRangeLowest;

    private VoiceRangeMatchingMusicDto voiceRangeMatchingMusic;

    @Builder
    public VoiceRangeMatchingResponseDto(String voiceRangeHighest, String voiceRangeLowest, VoiceRangeMatchingMusicDto voiceRangeMatchingMusic) {
        this.voiceRangeHighest = voiceRangeHighest;
        this.voiceRangeLowest = voiceRangeLowest;
        this.voiceRangeMatchingMusic = voiceRangeMatchingMusic;
    }
}
