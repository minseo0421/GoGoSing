package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.dto.user.request.UserSignUpRequestDto;
import com.ssafy.gogosing.dto.user.request.UserSingUpPlusRequestDto;
import com.ssafy.gogosing.dto.user.response.UserMypageResponseDto;
import com.ssafy.gogosing.global.redis.repository.CertificationNumberDao;
import com.ssafy.gogosing.global.redis.service.RedisAccessTokenService;
import com.ssafy.gogosing.global.redis.service.RedisRefreshTokenService;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final RedisAccessTokenService redisAccessTokenService;

    private final EmailService emailCertificationService;

    private final CertificationNumberDao certificationNumberDao;

    /**
     * 일반 회원 가입
     */
    @Transactional
    public Long signUp(UserSignUpRequestDto userSignUpRequestDto) throws Exception {

        if(userRepository.findByEmail(userSignUpRequestDto.getEmail()).isPresent())
            throw new Exception("이미 존재하는 이메일입니다.");

        if(userRepository.findByNickname(userSignUpRequestDto.getNickname()).isPresent())
            throw new Exception("이미 존재하는 닉네임입니다.");

        // 이메일 유효성 검사
        if (!Pattern.matches("[0-9a-zA-Z]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$", userSignUpRequestDto.getEmail())) {
            throw new IllegalStateException("이메일 형식을 다시 맞춰주세요.");
        }

        emailCertificationService.verifyEmail(userSignUpRequestDto.getEmailCertificationNumber(), userSignUpRequestDto.getEmail());

        // 인증된 이메일로 가입을 시도하면 redis에 저장한 인증번호 삭제
        certificationNumberDao.removeCertificationNumber(userSignUpRequestDto.getEmail());

        // 비밀번호 유효성 검사
        if (!Pattern.matches("^.*(?=^.{9,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$", userSignUpRequestDto.getPassword())) {
            throw new IllegalStateException("비밀번호 형식이 맞지않습니다.");
        }

        User user = userSignUpRequestDto.toEntity();

        user.passwordEncode(passwordEncoder);

        user.updateProfileImage("https://gogosing.s3.ap-northeast-2.amazonaws.com/DefaultProfile.png");

        System.out.println(user.getEmail());
        User saveUser = userRepository.save(user);

        return saveUser.getId();
    }

    /**
     * 소셜 회원가입 시 따로 추가 정보 받기
     */
    @Transactional
    public Long singUpPlus(UserSingUpPlusRequestDto userSingUpPlusRequestDto, UserDetails userDetails) throws Exception {

        if(userRepository.findByNickname(userSingUpPlusRequestDto.getNickname()).isPresent())
            throw new Exception("이미 존재하는 닉네임입니다.");

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if(user.getProfileImg() == null) {
            user.updateProfileImage("https://gogosing.s3.ap-northeast-2.amazonaws.com/DefaultProfile.png");
        }

        user.updateSignupPlus(userSingUpPlusRequestDto);

        User saveUser = userRepository.save(user);

        return saveUser.getId();
    }

    /**
     * 로그아웃
     * 성공 시 accessToken blacklist 추가 및 refreshToken 삭제
     */
    public Long logout(String accessToken, UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        redisRefreshTokenService.deleteRefreshToken(user.getEmail());
        redisAccessTokenService.setRedisAccessToken(accessToken.replace("Bearer ", ""), "LOGOUT");

        return user.getId();
    }

    /**
     * 회원 탈퇴
     * 성공 시 accessToken blacklist 추가 및 refreshToken 삭제
     */
    @Transactional
    public Long quit(String accessToken, UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        user.updateDeletedDate();
        userRepository.save(user);

        redisRefreshTokenService.deleteRefreshToken(user.getEmail());
        redisAccessTokenService.setRedisAccessToken(accessToken.replace("Bearer ", ""), "QUIT");

        return user.getId();
    }

    /**
     * 마이페이지에 제공할 회원 상세정보 가져오기
     */
    public UserMypageResponseDto getUserDetail(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        return new UserMypageResponseDto(user);
    }

    public void nicknameUsefulCheck(String nickname) throws Exception {

        if(userRepository.findByNickname(nickname).isPresent())
            throw new Exception("이미 존재하는 닉네임입니다.");
    }

}
