package com.ssafy.gogosing.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    /**
     * 자체로그인 -> FIRST
     * OAuth2 첫 로그인 -> GUEST, 추가정보 입력 시 -> FIRST
     * 두번째 로그인 -> USER
     * 추후 필요에 따라 ADMIN 추가
     */
    GUEST("ROLE_GUEST"), USER("ROLE_USER"), FIRST("ROLE_FIRST");

    private final String key;
}
