package com.ssafy.gogosing.domain.analyze;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
//@Table(name = "music_range_analyze")
@Table(name = "music_range_analyze", indexes = {
        @Index(name = "idx_max_pitch", columnList = "max_pitch")
})
public class MusicRangeAnalyze {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id")
    private Long musicId;

    @Column(name = "max_pitch")
    private Double maxPitch;

    @Column(name = "max_pitch_name")
    private String maxPitchName;

}
