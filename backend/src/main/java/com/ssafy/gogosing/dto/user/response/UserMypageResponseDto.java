package com.ssafy.gogosing.dto.user.response;

import com.ssafy.gogosing.domain.user.Gender;
import com.ssafy.gogosing.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserMypageResponseDto {

    private String nickname;

    private Gender gender;

    private LocalDate birth;

    private String profileImg;

    // 추후 장르, 내 음역대, 음색 파일 추가하기

    @Builder
    public UserMypageResponseDto(User user) {
        this.nickname = user.getNickname();
        this.gender = user.getGender();
        this.birth = user.getBirth();
        this.profileImg = user.getProfileImg();
    }
}
