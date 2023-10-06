package com.ssafy.gogosing.dto.user.response;

import com.ssafy.gogosing.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserMypageVoiceFileResponseDto {

    private String nickname;

    private String voiceFileName;

    @Builder
    public UserMypageVoiceFileResponseDto(User user) {
        this.nickname = user.getNickname();
        this.voiceFileName = user.getVoiceFileName();
    }
}
