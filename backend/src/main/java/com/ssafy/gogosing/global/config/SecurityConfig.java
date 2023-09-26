package com.ssafy.gogosing.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.gogosing.global.jwt.filter.JwtAuthenticationProcessingFilter;
import com.ssafy.gogosing.global.jwt.service.JwtService;
import com.ssafy.gogosing.global.login.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.ssafy.gogosing.global.login.handler.LoginFailureHandler;
import com.ssafy.gogosing.global.login.handler.LoginSuccessHandler;
import com.ssafy.gogosing.global.login.service.LoginService;
import com.ssafy.gogosing.global.oauth2.handler.OAuth2LoginFailureHandler;
import com.ssafy.gogosing.global.oauth2.handler.OAuth2LoginSuccessHandler;
import com.ssafy.gogosing.global.oauth2.service.CustomOAuth2UserService;
import com.ssafy.gogosing.global.redis.service.RedisRefreshTokenService;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

/*
 * 인증은 CustomJsonUsernamePasswordAuthenticationFilter에서 authenticate()로 인증된 사용자로 처리
 * JwtAuthenticationProcessingFilter는 AccessToken, RefreshToken 재발급
 * */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final LoginService loginService;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper;

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    private final CustomOAuth2UserService customOAuth2UserService;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/ws/**"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .formLogin().disable() // FormLogin 사용 X
                .httpBasic().disable() // httpBasic 사용 X
                .csrf().disable() // csrf 보안 사용 X
                .headers().frameOptions().disable()
                .and()
                .cors()
                .and()

                // 세션 사용 X, 토큰 사용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                // URL 별 권한 관리
                .authorizeRequests()

                    .antMatchers("/", "/favicon.ico", "/oauth2/**","/api/sessions/**", "/api/user/checkbyemail/**", "/api/user/checkbynickname/**", "/api/email/**").permitAll()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers("/api/user/signup").permitAll() // 회원가입 접근 OK
                .antMatchers("/api/login").permitAll() // 회원가입 접근 OK
                .anyRequest().authenticated() // 그 외 경로는 모두 인증된 사용자만 접근 가능
                .and()

                // 소셜 로그인 설정
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint().userService(customOAuth2UserService);

//                .and()
//                .requiresChannel() // HTTPS 요구 설정 시작
//                .anyRequest().requiresSecure(); // 모든 요청에 HTTPS 요구 설정;

        // 스프링 시큐리티 필터 순서 :
        // LogoutFilter -> JwtAuthenticationProcessingFilter -> CustomJsonUsernamePasswordAuthenticationFilter
        // 아래 둘 순서 바꾸면 에러
        httpSecurity.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
        httpSecurity.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);


        // 로그아웃



        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /*
     * AuthenticationManager 설정 후 등록
     * */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(loginService);

        return new ProviderManager(daoAuthenticationProvider);
    }

    /*
     * 로그인 성공 시 호출
     * */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, userRepository, redisRefreshTokenService);
    }

    /*
     * 로그인 실패 시 호출
     * */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter
                = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);

        customJsonUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager());
        customJsonUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        customJsonUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(loginFailureHandler());

        return customJsonUsernamePasswordAuthenticationFilter;
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter = new JwtAuthenticationProcessingFilter(jwtService, userRepository, redisRefreshTokenService);

        return jwtAuthenticationProcessingFilter;
    }
}
