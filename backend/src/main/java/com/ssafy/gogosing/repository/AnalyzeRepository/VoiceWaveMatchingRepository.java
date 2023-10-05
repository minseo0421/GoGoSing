package com.ssafy.gogosing.repository.AnalyzeRepository;

import com.ssafy.gogosing.domain.analyze.VoiceWaveMatching;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoiceWaveMatchingRepository extends MongoRepository<VoiceWaveMatching, Long> {

    Optional<VoiceWaveMatching> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}