package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.user.request.UserSignUpRequestDto;
import com.ssafy.gogosing.dto.user.request.UserSingUpPlusRequestDto;
import com.ssafy.gogosing.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "일반 회원 가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpRequestDto userSignUpRequestDto) throws Exception {

        return ResponseEntity.ok()
                .body(userService.signUp(userSignUpRequestDto));
    }

    @ApiOperation(value = "소셜 회원 가입 시 추가 정보 저장")
    @PostMapping("/signup-plus")
    public ResponseEntity<?> signUpPlus(@RequestBody UserSingUpPlusRequestDto userSingUpPlusRequestDto,
                                        @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.ok().body(userService.singUpPlus(userSingUpPlusRequestDto, userDetails));
    }

    /**
     * 테스트용 추후 삭제하기
     */
    @GetMapping("/jwt-test")
    public ResponseEntity<?> jwtTest() {

        return ResponseEntity.ok()
                .body("jwtTest 요청 성공");
    }

}
