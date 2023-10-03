package com.ssafy.gogosing.dto.genre.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicGenreResponseDto {
    private Long genreId;
    private String genreType;

    @Builder
    public MusicGenreResponseDto(Long genreId, String genreType) {
        this.genreId = genreId;
        this.genreType = genreType;
    }
}
