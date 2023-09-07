package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.dto.user.request.UserSignUpRequestDto;
import com.ssafy.gogosing.dto.user.request.UserSingUpPlusRequestDto;
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

        // 비밀번호 유효성 검사
        if (!Pattern.matches("^.*(?=^.{9,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$", userSignUpRequestDto.getPassword())) {
            throw new IllegalStateException("비밀번호 형식이 맞지않습니다.");
        }

        User user = userSignUpRequestDto.toEntity();

        user.passwordEncode(passwordEncoder);

        user.updateProfileImage("DefaultProfile.png");

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
            user.updateProfileImage("DefaultProfile.png");
        }

        user.updateSignupPlus(userSingUpPlusRequestDto);

        User saveUser = userRepository.save(user);

        return saveUser.getId();
    }
}
