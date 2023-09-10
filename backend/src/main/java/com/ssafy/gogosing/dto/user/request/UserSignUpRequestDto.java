package com.ssafy.gogosing.dto.user.request;

import com.ssafy.gogosing.domain.user.Gender;
import com.ssafy.gogosing.domain.user.Role;
import com.ssafy.gogosing.domain.user.SocialType;
import com.ssafy.gogosing.domain.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSignUpRequestDto {

    @NotBlank(message = "email은 빈값이 올 수 없습니다")
    private String email;

    @NotBlank(message = "password는 빈값이 올 수 없습니다")
    private String password;

    @NotBlank(message = "nickname은 빈값이 올 수 없습니다")
    private String nickname;

    @NotBlank(message = "gender는 빈값이 올 수 없습니다")
    private String gender;

    @NotBlank(message = "birth는 빈값이 올 수 없습니다")
    private String birth;

    public User toEntity() {

        return User.builder()
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .gender(Gender.valueOf(this.gender))
                .birth(LocalDate.parse(this.birth))
                .role(Role.USER)
                .socialType(SocialType.X)
                .build();
    }
}
