package com.ssafy.gogosing.dto.user.request;

import com.ssafy.gogosing.domain.user.Gender;
import com.ssafy.gogosing.domain.user.Role;
import com.ssafy.gogosing.domain.user.SocialType;
import com.ssafy.gogosing.domain.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSingUpPlusRequestDto {

    private String nickname;

    private Gender gender;

    private LocalDate birth;

    public User toEntity() {

        return User.builder()
                .nickname(this.nickname)
                .gender(this.gender)
                .birth(this.birth)
                .role(Role.USER)
                .socialType(SocialType.X)
                .build();
    }
}
