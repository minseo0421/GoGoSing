package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.dto.search.response.SearchResponseDto;
import com.ssafy.gogosing.repository.SearchRepository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    /**
     * 제목 검색에는 띄워쓰기를 구분함
     */
    public List<SearchResponseDto> searchByTitle(String keyword) {
        // 띄어쓰기로 구분된 단어 추출
        String[] keywords = keyword.split("\\s+");

        List<Music> musicList = searchRepository.findAllByTitle(keywords);

        return builder(musicList);
    }

    /**
     * 가수 검색에는 띄워쓰기를 구분안함
     */
    public List<SearchResponseDto> searchBySinger(String keyword) {

        List<Music> musicList = searchRepository.findBySinger(keyword);

        return builder(musicList);
    }

    public List<SearchResponseDto> searchByLyric(String sentence) {

        List<Music> musicList = searchRepository.findAllByLyric(sentence);

        return builder(musicList);
    }

    private List<SearchResponseDto> builder(List<Music> musicList) {
        List<SearchResponseDto> result = new ArrayList<>();

        for(Music music : musicList) {
            SearchResponseDto searchResponseDto = SearchResponseDto.builder()
                    .music(music)
                    .build();

            result.add(searchResponseDto);
        }

        return result;
    }
}
