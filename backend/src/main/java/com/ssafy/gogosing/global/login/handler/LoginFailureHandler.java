package com.ssafy.gogosing.global.login.handler;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
* JWT를 활용한 일반 로그인 실패 처리
*/
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        AuthenticationException authenticationException) throws IOException {

        httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("text/plain;charset=UTF-8");
        httpServletResponse.getWriter().write("로그인 실패! 이메일/비밀번호를 확인해주세요.");
    }
}
