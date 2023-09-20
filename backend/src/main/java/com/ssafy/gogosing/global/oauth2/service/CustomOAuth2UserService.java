package com.ssafy.gogosing.global.oauth2.service;

import com.ssafy.gogosing.domain.user.SocialType;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.global.oauth2.CustomOAuth2User;
import com.ssafy.gogosing.global.oauth2.OAuthAttributes;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    private static final String NAVER = "naver";
    private static final String KAKAO = "kakao";
    private static final String GOOGLE = "google";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // loadUser : 소셜 로그인 API의 사용자 정보 제공 URI로 요청
        // => 사용자 정보를 얻은 후 객체 반환
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // userRequest에서 registrationId 추출 후 registrationId으로 SocialType 저장
        // userNameAttributeName은 이후에 nameAttributeKey로 설정
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        SocialType socialType = getSocialType(registrationId);

        // OAuth2 로그인 시 PK
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보)
        Map<String, Object> attributes = oAuth2User.getAttributes();

        System.out.println(userRequest.getAccessToken());


        OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);

        User createdUser = getUser(extractAttributes, socialType);

        // DefaultOAuth2User를 구현한 CustomOAuth2User 객체를 생성하여 반환
        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getEmail(),
                createdUser.getRole()
        );
    }

    private SocialType getSocialType(String registrationId) {
        if(NAVER.equals(registrationId))
            return SocialType.NAVER;

        if(KAKAO.equals(registrationId))
            return SocialType.KAKAO;

        if(GOOGLE.equals(registrationId))
            return SocialType.GOOGLE;

        return null;
    }

    private User getUser(OAuthAttributes oAuthAttributes, SocialType socialType) {
        User user = userRepository.findBySocialTypeAndSocialId(
                        socialType,
                        oAuthAttributes.getOAuth2UserInfo().getId())
                .orElse(null);

        if(user == null)
            return saveUser(oAuthAttributes, socialType);

        return user;
    }

    private User saveUser(OAuthAttributes oAuthAttributes, SocialType socialType) {
        User user = oAuthAttributes.toEntity(socialType, oAuthAttributes.getOAuth2UserInfo());

        User saveUser = userRepository.save(user);

        return saveUser;
    }
}
