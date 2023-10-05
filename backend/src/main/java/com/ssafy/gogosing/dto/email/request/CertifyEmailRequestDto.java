package com.ssafy.gogosing.dto.email.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CertifyEmailRequestDto {

    private String certificationNumber;

    private String email;
}
