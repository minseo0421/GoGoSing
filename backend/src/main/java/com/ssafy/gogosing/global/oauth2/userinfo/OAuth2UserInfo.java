package com.ssafy.gogosing.global.oauth2.userinfo;

import com.ssafy.gogosing.domain.user.Gender;

import java.util.Map;

public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    // 소셜 식별 값
    // 구글 : "sub"
    // 카카오 : "id"
    // 네이버 : "id"
    public abstract String getId();

//    public abstract Gender getGender();

    public abstract String getProfileImg();
}
