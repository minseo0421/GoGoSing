package com.ssafy.gogosing.global.oauth2.handler;

import com.ssafy.gogosing.domain.user.Role;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.global.jwt.service.JwtService;
import com.ssafy.gogosing.global.oauth2.CustomOAuth2User;
import com.ssafy.gogosing.global.redis.service.RedisRefreshTokenService;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/*
 * 소셜 로그인 성공 시 처리 로직
 * */
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private String access = "";
    private String refresh = "";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            String targetUrl = loginSuccess(httpServletResponse, oAuth2User);

//            clearAuthenticationAttributes(request, response);
            httpServletResponse.sendRedirect(targetUrl);
//            loginSuccess(httpServletResponse, oAuth2User);

        } catch(Exception e) {
            e.printStackTrace();

            throw e;
        }
    }

    private String loginSuccess(HttpServletResponse httpServletResponse, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken();

        httpServletResponse.addHeader(jwtService.getAccessHeader(), accessToken);
        httpServletResponse.addHeader(jwtService.getRefreshHeader(), refreshToken);

        jwtService.sendAccessAndRefreshToken(httpServletResponse, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);

        access = accessToken;
        refresh = refreshToken;

        Cookie emailCookie = new Cookie("new_social_user_email", oAuth2User.getEmail());
        emailCookie.setMaxAge(600);
        emailCookie.setPath("/");
        httpServletResponse.addCookie(emailCookie);

        // Access Token을 쿠키로 설정
        Cookie accessTokenCookie = new Cookie("Authorization", accessToken);
        accessTokenCookie.setMaxAge(3600); // 1시간 유효한 쿠키로 설정
        accessTokenCookie.setPath("/"); // 모든 경로에서 접근 가능하도록 설정
//        accessTokenCookie.setHttpOnly(true); // JavaScript로 접근을 막기 위해 HttpOnly 설정
//        accessTokenCookie.setSecure(true); // HTTPS를 사용할 경우에만 전송되도록 설정
        httpServletResponse.addCookie(accessTokenCookie);

        // Refresh Token을 쿠키로 설정 (위와 동일한 방식으로 쿠키 생성)
        Cookie refreshTokenCookie = new Cookie("Authorization-Refresh", refreshToken);
        refreshTokenCookie.setMaxAge(1209600); // 24시간 유효한 쿠키로 설정
        refreshTokenCookie.setPath("/");
//        refreshTokenCookie.setHttpOnly(true);
//        refreshTokenCookie.setSecure(true);
        httpServletResponse.addCookie(refreshTokenCookie);

        // Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
        if(oAuth2User.getRole() == Role.GUEST) {
//            // guest : 해당 계정으로 소셜 첫 로그인이므로 추가정보 받아야하는 상태
//            httpServletResponse.addHeader("user_role", "guest");
            // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
//            httpServletResponse.sendRedirect("http://localhost:8081/");
//            httpServletResponse.sendRedirect("http://192.168.31.187:3000/sociallogin" + accessToken);

            Optional<User> findUser = userRepository.findByEmail(oAuth2User.getEmail());

            // Redis에 저장
            if(findUser.isPresent())
                redisRefreshTokenService.setRedisRefreshToken(refreshToken, oAuth2User.getEmail());
            else
                throw new NullPointerException("해당 유저가 존재하지 않습니다.");

            access = accessToken;
            refresh = refreshToken;

            return UriComponentsBuilder.fromUriString("http://192.168.31.187:3000/sociallogin")
                    .queryParam("Authorization", accessToken)
                    .queryParam("Authorization-Refresh", refreshToken)
                    .queryParam("user_role", "guest")
                    .build()
                    .toUriString();
        }
        else if(oAuth2User.getRole() == Role.FIRST) {
//            // first : 해당 계정으로 추가정보를 받고 소셜 첫 로그인인 상태
//            httpServletResponse.addHeader("user_role", "first");
            // 해당 계정으로 첫 로그인 이므로 장르 선택 페이지로 리다이렉트
//            httpServletResponse.sendRedirect("http://192.168.31.187:3000/sociallogin"  + accessToken);

            User user = userRepository.findByEmail(oAuth2User.getEmail())
                    .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

            user.updateFirstRole();

            userRepository.save(user);

            return UriComponentsBuilder.fromUriString("http://192.168.31.187:3000/sociallogin")
                    .queryParam("Authorization", accessToken)
                    .queryParam("Authorization-Refresh", refreshToken)
                    .queryParam("user_role", "first")
                    .build()
                    .toUriString();
        }
        else {
//            // user : 회원가입 추가 정보가 입력되어 있고 첫번째 로그인이 아니고 로그인 성공 상태
//            httpServletResponse.addHeader("user_role", "user");
            // 회원가입 추가 정보가 입력되어 있고 첫번째 로그인이 아니고 로그인 성공 상태이면 홈 으로 리다이렉트
//            httpServletResponse.sendRedirect("http://192.168.31.187:3000/sociallogin"  + accessToken);
            return UriComponentsBuilder.fromUriString("http://192.168.31.187:3000/sociallogin")
                    .queryParam("Authorization", accessToken)
                    .queryParam("Authorization-Refresh", refreshToken)
                    .queryParam("user_role", "user")
                    .build()
                    .toUriString();
        }
    }

    public Map<String, String> socialLoginSuccessAndSendTokenToFront() {
        Map<String, String> map = new HashMap<>();

        map.put("Authorization", access);
        map.put("Authorization-Refresh", refresh);

        return map;
    }
}
