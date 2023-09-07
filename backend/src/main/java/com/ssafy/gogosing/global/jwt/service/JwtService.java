package com.ssafy.gogosing.global.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.global.redis.service.RedisRefreshTokenService;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    /**
    * JWT의 Subject, Claim으로 email 사용 -> 클레임 name "email"로
    * JWT Header에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
    */
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";

    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";

    private static final String EMAIL_CLAIM = "email";

    private static final String BEARER = "Bearer ";

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    /**
     * AccessToken 생성 메서드
     */
    public String createAccessToken(String email) {
        Date now = new Date();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        // JWT 토큰 생성
        return JWT.create()
                .withSubject(ACCESS_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 만료시간 설정
                .withClaim(EMAIL_CLAIM, email)
                .sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, SecretKey로 암호화
    }

    /**
     * RefreshToken 생성 메서드
     */
    public String createRefreshToken() {
        Date now = new Date();

        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    /**
    * AccessToken Header에 실어 보내기
    */
    public void sendAccessToken(HttpServletResponse httpServletResponse, String accessToken) {
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);

        setAccessTokenHeader(httpServletResponse, accessToken);
    }

    /**
    * AcessToken + RefreshToken Header에 실어 보내기
    */
    public void sendAccessAndRefreshToken(HttpServletResponse httpServletResponse,
                                          String accessToken, String refreshToken) {
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);

        setAccessTokenHeader(httpServletResponse, accessToken);
        setRefreshTokenHeader(httpServletResponse, refreshToken);
    }

    /**
     * AccessToken 헤더 설정
     */
    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    /**
     * RefreshToken 헤더 설정
     */
    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    /**
    * Header에서 RefreshToken 추출
    * Bearer를 제외하고 순수 토큰만 가져오기 위해서 BEARER 제거
    */
    public Optional<String> extractRefreshToken(HttpServletRequest httpServletRequest) {

        return Optional.ofNullable(httpServletRequest.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
    * Header에서 AccessToken 추출
    */
    public Optional<String> extractAccessToken(HttpServletRequest httpServletRequest) {

        return Optional.ofNullable(httpServletRequest.getHeader(accessHeader))
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }
    

    /**
    * AccessToken에서 Email 추출
    */
    public Optional<String> extractEmail(String accessToken) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey)) // Token 유효성 검증
                    .build() // JWT verifier 생성
                    .verify(accessToken) // accessToken 검증 -> 유효x : 예외 발생
                    .getClaim(EMAIL_CLAIM) // claim에서 email 추출
                    .asString());   // String으로 변환 후 유저 Email을 반환
        } catch(Exception e) {
            e.printStackTrace();
            log.error("액세스 토큰이 유효하지 않습니다.");

            return Optional.empty();
        }
    }

    /**
    * RefreshToken Redis 저장 (업데이트)
    */
    public void updateRefreshToken(String email, String refreshToken) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent())
            redisRefreshTokenService.setRedisRefreshToken(refreshToken, email);
        else
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
    }

    /**
    * 토큰 유효성 검사
    */
    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(token);

            return true;
        } catch(Exception e) {
            e.printStackTrace();

            return false;
        }
    }
}
