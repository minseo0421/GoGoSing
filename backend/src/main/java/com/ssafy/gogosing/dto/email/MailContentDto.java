package com.ssafy.gogosing.dto.email;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MailContentDto {

    private String address;

    private String title;

    private String message;

    @Builder
    public MailContentDto(String address, String title, String message) {
        this.address = address;
        this.title = title;
        this.message = message;
    }
}
