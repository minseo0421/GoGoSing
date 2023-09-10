package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.user.request.UserSignUpRequestDto;
import com.ssafy.gogosing.dto.user.request.UserSingUpPlusRequestDto;
import com.ssafy.gogosing.global.jwt.service.JwtService;
import com.ssafy.gogosing.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final JwtService jwtService;

    @ApiOperation(value = "일반 회원 가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto) throws Exception {

        return ResponseEntity.ok()
                .body(userService.signUp(userSignUpRequestDto));
    }

    @ApiOperation(value = "소셜 회원 가입 시 추가 정보 저장")
    @PostMapping("/signup-plus")
    public ResponseEntity<?> signUpPlus(@Valid @RequestBody UserSingUpPlusRequestDto userSingUpPlusRequestDto,
                                        @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.ok().body(userService.singUpPlus(userSingUpPlusRequestDto, userDetails));
    }

    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout/{id}")
    public ResponseEntity<?> logout(HttpServletRequest httpServletRequest, @PathVariable Long id) {

        Long result = userService.logout(jwtService.extractAccessToken(httpServletRequest)
                .orElseThrow(() -> new IllegalArgumentException("비정상적인 access token 입니다.")), id);

        return ResponseEntity.ok().body(result);
    }

    /**
     * 테스트용 추후 삭제하기
     */
    @GetMapping("/jwt-test")
    public ResponseEntity<?> jwtTest() {

//        // 예외처리 되나 확인용
//        throw new RuntimeException("test");

        return ResponseEntity.ok()
                .body("jwtTest 요청 성공");
    }

}
