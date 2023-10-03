package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.user.request.UserPasswordUpdateRequestDto;
import com.ssafy.gogosing.dto.user.request.UserSignUpRequestDto;
import com.ssafy.gogosing.dto.user.request.UserSingUpPlusRequestDto;
import com.ssafy.gogosing.global.jwt.service.JwtService;
import com.ssafy.gogosing.global.s3upload.ImageService;
import com.ssafy.gogosing.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final JwtService jwtService;

    private final ImageService imageService;

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
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest httpServletRequest, 
                                    @AuthenticationPrincipal UserDetails userDetails) {

        Long result = userService.logout(jwtService.extractAccessToken(httpServletRequest)
                .orElseThrow(() -> new IllegalArgumentException("비정상적인 access token 입니다.")), userDetails);

        return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "회원 탈퇴")
    @PostMapping("/quit")
    public ResponseEntity<?> quit(HttpServletRequest httpServletRequest,
                                  @AuthenticationPrincipal UserDetails userDetails) {

        Long result = userService.quit(jwtService.extractAccessToken(httpServletRequest)
                .orElseThrow(() -> new IllegalArgumentException("비정상적인 access token 입니다.")), userDetails);

        return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "사용자 프로필 이미지 변경")
    @PostMapping("/update/profileImage")
    public ResponseEntity<?> updateProfileImage(@RequestParam("s3upload") MultipartFile multipartFile,
                                              @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.ok().body(imageService.updateProfileImage(multipartFile, userDetails));
    }

    @ApiOperation(value = "사용자 프로필 이미지 삭제")
    @DeleteMapping("/delete/profileImage")
    public ResponseEntity<?> deleteProfileImage(@AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        imageService.deleteProfileImage(userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");

    }

    @ApiOperation(value = "유저 상세정보 조회")
    @GetMapping("/detail")
    public ResponseEntity<?> getUserDetail(@AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok()
                .body(userService.getUserDetail(userDetails.getUsername()));
    }

    @ApiOperation(value = "닉네임 중복 확인")
    @GetMapping("/nicknameCheck")
    public ResponseEntity<?> nicknameUsefulCheck(@RequestParam("nickname") String nickname) throws Exception {

        userService.nicknameUsefulCheck(nickname);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @ApiOperation(value = "닉네임 변경")
    @PutMapping("/update/nickname")
    public ResponseEntity<?> updateNickname(@RequestParam("nickname") String nickname, @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        userService.updateNickname(nickname, userDetails);
        return ResponseEntity.ok().body("");
    }

    @ApiOperation(value = "비밀번호 변경")
    @PutMapping("/update/password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UserPasswordUpdateRequestDto userPasswordUpdateRequestDto,
                                            @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.ok()
                .body(userService.updatePassword(userPasswordUpdateRequestDto, userDetails));
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
