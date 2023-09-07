package com.ssafy.gogosing.global.oauth2.api;

import com.ssafy.gogosing.global.oauth2.handler.OAuth2LoginSuccessHandler;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/oauth2")
public class OAuth2Controller {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @ApiOperation(value = "소셜 로그인 JWT 받기")
    @GetMapping("/social")
    public ResponseEntity<?> socialLoginGetToken() {

        return ResponseEntity.ok()
                .body(oAuth2LoginSuccessHandler.socialLoginSuccessAndSendTokenToFront());
    }
}
