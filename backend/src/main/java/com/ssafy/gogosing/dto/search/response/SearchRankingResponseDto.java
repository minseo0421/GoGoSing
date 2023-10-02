package com.ssafy.gogosing.dto.search.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchRankingResponseDto {

    private Long rank;

    private String keyword;

    @Builder
    public SearchRankingResponseDto(Long rank, String keyword) {
        this.rank = rank;
        this.keyword = keyword;
    }
}
