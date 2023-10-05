package com.ssafy.gogosing.domain.analyze;

import com.ssafy.gogosing.dto.analyze.response.VoiceWaveMatchingResponseDto;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "user_voice_wave_matching")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoiceWaveMatching {
    @Id
    private String id;

    private Long userId;

    private List<VoiceWaveMatchingResponseDto> voiceWaveMatchingResponseDtoList;

    @Builder
    public VoiceWaveMatching(String id, Long userId, List<VoiceWaveMatchingResponseDto> voiceWaveMatchingResponseDtoList) {
        this.id = id;
        this.userId = userId;
        this.voiceWaveMatchingResponseDtoList = voiceWaveMatchingResponseDtoList;
    }
}
