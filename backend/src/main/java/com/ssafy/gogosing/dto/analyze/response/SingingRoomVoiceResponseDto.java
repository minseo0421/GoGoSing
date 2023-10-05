package com.ssafy.gogosing.dto.analyze.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SingingRoomVoiceResponseDto {

    private String voiceUrl;

    @Builder
    public SingingRoomVoiceResponseDto(String voiceUrl) {
        this.voiceUrl = voiceUrl;
    }
}
