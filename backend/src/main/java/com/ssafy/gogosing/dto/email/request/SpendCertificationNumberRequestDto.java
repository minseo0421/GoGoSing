package com.ssafy.gogosing.dto.email.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SpendCertificationNumberRequestDto {

    private String email;
}
