package com.ssafy.gogosing.dto.analyze.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
