package com.ssafy.gogosing.dto.user.response;

import com.ssafy.gogosing.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserMypageVoiceRangeResponseDto {

    private String nickname;

    private String voiceRangeHighest;

    private String voiceRangeLowest;

    @Builder
    public UserMypageVoiceRangeResponseDto(User user) {
        this.nickname = user.getNickname();
        this.voiceRangeHighest = user.getVoiceRangeHighest();
        this.voiceRangeLowest = user.getVoiceRangeLowest();
    }
}
