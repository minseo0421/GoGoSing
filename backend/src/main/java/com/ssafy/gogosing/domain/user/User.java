package com.ssafy.gogosing.domain.user;

import com.ssafy.gogosing.domain.BaseTimeEntity;
import com.ssafy.gogosing.dto.user.request.UserSingUpPlusRequestDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "users")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email", unique = true)
    private String email; // 이메일이자 로그인할 때 사용하는 id

    @Column(name = "password")
    private String password;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "birth")
    private LocalDate birth;

    @Column(name = "profile_img")
    private String profileImg;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "social_type")
    private SocialType socialType;

    @Column(name = "social_id")
    private String socialId;

    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;

    @Column(name = "voice_range_highest")
    private String voiceRangeHighest;

    @Column(name = "voice_range_lowest")
    private String voiceRangeLowest;

    @Column(name = "voice_file")
    private String voiceFile;

    @Column(name = "max_pitch")
    private Double maxPitch;

    @Builder
    public User(Long id, String email, String password, String nickname, Gender gender, LocalDate birth, String profileImg, Role role, SocialType socialType, String socialId, LocalDateTime deletedDate, String voiceRangeHighest, String voiceRangeLowest, Double maxPitch) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.profileImg = profileImg;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
        this.deletedDate = deletedDate;
        this.voiceRangeHighest = voiceRangeHighest;
        this.voiceRangeLowest = voiceRangeLowest;
        this.maxPitch = maxPitch;
    }

    /**
     * 비밀번호 암호화
    */
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public Long updateProfileImage(String profileImg) {
        this.profileImg = profileImg;

        return this.id;
    }

    public void updateSignupPlus(UserSingUpPlusRequestDto userSingUpPlusRequestDto) {
        this.nickname = userSingUpPlusRequestDto.getNickname();
        this.gender = Gender.valueOf(userSingUpPlusRequestDto.getGender());
        this.birth = LocalDate.parse(userSingUpPlusRequestDto.getBirth());
        // 권한 수정
        this.role = Role.FIRST;
    }

    /**
     * 첫 로그인 이후 표시 변경
     */
    public void updateFirstRole() {
        this.role = Role.USER;
    }

    /**
     * 비밀번호 변경후 암호화
     */
    public void updatePassword(String tempPassword, PasswordEncoder passwordEncoder) {
        this.password = tempPassword;
        passwordEncode(passwordEncoder);
    }

    /**
     * 내 목소리 파일 변경
     */
    public Long updateVoiceFile(String voiceFile) {
        this.voiceFile = voiceFile;

        return this.id;
    }

    public void updateVoiceRange(String voiceRangeHighest, String voiceRangeLowest, String voiceRangeNum) {
        this.voiceRangeHighest = voiceRangeHighest;
        this.voiceRangeLowest = voiceRangeLowest;
        this.maxPitch = Double.valueOf(voiceRangeNum);
    }

    public void updateDeletedDate() {
        this.deletedDate = LocalDateTime.now();
    }
}