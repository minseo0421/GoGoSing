package com.ssafy.gogosing.dto.genre.request;

import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenreRequestDto {
	@NotNull
	private List<Long> genres;
}
