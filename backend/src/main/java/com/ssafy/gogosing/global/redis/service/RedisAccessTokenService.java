package com.ssafy.gogosing.global.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RedisAccessTokenService {

    private final RedisTemplate redisTemplate;

    /**
    * Key-Value 설정
    */
    @Transactional
    public void setRedisAccessToken(String accessToken, String type) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set("[BlackList] : " + accessToken, type, Duration.ofMinutes(1440));
    }

    /**
     * Key로 Value 유무 조회
     */
    public boolean isBlackList(String accessToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String blackList = valueOperations.get("[BlackList] : " + accessToken);

        if (blackList == null) {
            return false;
        }

        // 회원 탈퇴 추가하면 "QUIT"랑 "LOGOUT" 구분하는 처리 추가해주기

        return true;
    }

}
