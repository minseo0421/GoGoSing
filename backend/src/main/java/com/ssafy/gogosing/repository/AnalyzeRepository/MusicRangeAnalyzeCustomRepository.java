package com.ssafy.gogosing.repository.AnalyzeRepository;

import com.ssafy.gogosing.domain.analyze.MusicRangeAnalyze;

import java.util.List;

public interface MusicRangeAnalyzeCustomRepository {

    List<MusicRangeAnalyze> findMatchingListByMaxPitch(double maxPitch);
}
