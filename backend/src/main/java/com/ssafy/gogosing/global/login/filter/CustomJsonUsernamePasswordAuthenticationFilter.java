package com.ssafy.gogosing.global.login.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * 스프링 시큐리티의 폼 기반의 UsernamePasswordAuthenticationFilter를 참고하여 만든 커스텀 필터
 * Username : 회원 아이디 -> email로 설정
 * "/login" 요청 왔을 때 JSON 값을 매핑 처리하는 필터
 */
public class CustomJsonUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final String DEFAULT_LOGIN_REQUEST_URL = "/api/login";

    private static final String HTTP_METHOD = "POST";

    private static final String CONTENT_TYPE = "application/json";

    private static final String USERNAME_KEY = "email";

    private static final String PASSWORD_KEY = "password";

    private static final AntPathRequestMatcher DEFAULT_LOGIN_PATH_REQUEST_MATCHER = new AntPathRequestMatcher(DEFAULT_LOGIN_REQUEST_URL, HTTP_METHOD);

    private final ObjectMapper objectMapper;

    public CustomJsonUsernamePasswordAuthenticationFilter(ObjectMapper objectMapper) {
        super(DEFAULT_LOGIN_PATH_REQUEST_MATCHER);

        this.objectMapper = objectMapper;
    }

    /**
    * 로그인 인증 처리
    */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException {
        if(httpServletRequest.getContentType() == null || !httpServletRequest.getContentType().equals(CONTENT_TYPE))
            throw new AuthenticationServiceException("Authentication Content-Type Not Supported : " + httpServletRequest.getContentType());

        // request에서 messageBody를 JSON 형태로 반환
        String messageBody = StreamUtils.copyToString(httpServletRequest.getInputStream(), StandardCharsets.UTF_8);

        // JSON 형태를 Key-Value 형태로 변환하여 Map에 저장
        Map<String, String> userLoginMap = objectMapper.readValue(messageBody, Map.class);

        String email = userLoginMap.get(USERNAME_KEY);
        String password = userLoginMap.get(PASSWORD_KEY);

        System.out.println("email = " + email);
        System.out.println("password = " + password);

        //principal, credentials 전달
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // AbstractAuthenticationProcessingFilter(부모)의 getAuthenticationManager()로 AuthenticationManager 객체를 반환 받은 후
        // authenticate()의 파라미터로 UsernamePasswordAuthenticationToken 객체를 넣고 인증 처리
        // 여기서 AuthenticationManager 객체는 ProviderManager -> SecurityConfig에서 설정
        return this.getAuthenticationManager().authenticate(usernamePasswordAuthenticationToken);
    }
}
