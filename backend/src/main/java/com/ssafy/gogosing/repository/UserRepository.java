package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.user.SocialType;
import com.ssafy.gogosing.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deletedDate IS NULL")
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndDeletedDateIsNull(String email);

    @Query("SELECT u FROM User u WHERE u.nickname = :nickname AND u.deletedDate IS NULL")
    Optional<User> findByNickname(String nickname);

    /**
     * 소셜 타입 & 소셜 식별 값으로 추가 정보를 입력하지 않은 회원을 찾는 메서드
     * 소셜 로그인 시 추가 정보를 입력받지 않은 채 저장된 상태에서 추가 정보를 입력받아 회원 가입을 진행하기 위해 사용
     */
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    @Override
    Optional<User> findById(Long aLong);

    @Override
    void deleteById(Long aLong);

    @Override
    <S extends User> S save(S entity);
}
