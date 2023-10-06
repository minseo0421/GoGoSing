package com.ssafy.gogosing.dto.music.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GenreMusicListResponseDto {
	private Long musicId;

	private String singer;

	private String songImg;

	private String title;

	private Long viewCount;

	@Builder
	public GenreMusicListResponseDto(Long musicId, String singer, String songImg, String title, Long viewCount) {
		this.musicId = musicId;
		this.singer = singer;
		this.songImg = songImg;
		this.title = title;
		this.viewCount = viewCount;
	}
}
