package com.ssafy.gogosing.global.redis.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@RequiredArgsConstructor
@Repository
public class CertificationNumberDao  {

    private final StringRedisTemplate stringRedisTemplate;

    private static final int LIMIT_TIME_CERTIFICATION_NUMBER = 5;

    public void saveCertificationNumber(String email, String certificationNumber) {
        stringRedisTemplate.opsForValue()
                .set(email, certificationNumber,
                        Duration.ofMinutes(LIMIT_TIME_CERTIFICATION_NUMBER));
    }

    public String getCertificationNumber(String email) {
        return stringRedisTemplate.opsForValue().get(email);
    }

    public void removeCertificationNumber(String email) {
        stringRedisTemplate.delete(email);
    }

    public boolean hasKey(String email) {
        return stringRedisTemplate.hasKey(email);
    }
}