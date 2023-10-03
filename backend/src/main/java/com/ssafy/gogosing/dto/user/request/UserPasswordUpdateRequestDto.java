package com.ssafy.gogosing.dto.user.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPasswordUpdateRequestDto {

    @NotBlank(message = "password는 빈값이 올 수 없습니다")
    private String password;
}
