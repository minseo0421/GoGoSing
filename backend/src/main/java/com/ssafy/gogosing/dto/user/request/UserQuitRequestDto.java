package com.ssafy.gogosing.dto.user.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserQuitRequestDto {

    private boolean socialType;

    private String checkPassword;
}
