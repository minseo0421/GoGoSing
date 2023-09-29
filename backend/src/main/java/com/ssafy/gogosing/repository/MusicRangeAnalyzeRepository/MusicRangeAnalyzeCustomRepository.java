package com.ssafy.gogosing.repository.MusicRangeAnalyzeRepository;

import com.ssafy.gogosing.domain.music.MusicRangeAnalyze;

import java.util.List;

public interface MusicRangeAnalyzeCustomRepository {

    List<MusicRangeAnalyze> findMatchingListByMaxPitch(double maxPitch);
}
