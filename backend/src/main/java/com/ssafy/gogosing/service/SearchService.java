package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.dto.search.response.SearchResponseDto;
import com.ssafy.gogosing.global.redis.service.RedisSearchRankingService;
import com.ssafy.gogosing.repository.SearchRepository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    private final RedisSearchRankingService redisSearchRankingService;

    /**
     * 제목 검색에는 띄워쓰기를 구분함
     */
    public List<SearchResponseDto> searchByTitle(String keyword, int page) {

        redisSearchRankingService.updateScore(keyword.trim());

        // 띄어쓰기로 구분된 단어 추출
        String[] keywords = keyword.split("\\s+");

        // 10개씩 페이징 처리해줌
        PageRequest pageRequest = PageRequest.of(page-1, 20);

        List<Music> musicList = searchRepository.findAllByTitle(keywords, pageRequest);

        return builder(musicList);
    }

    /**
     * 가수 검색에는 띄워쓰기를 구분안함
     */
    public List<SearchResponseDto> searchBySinger(String keyword, int page) {

        redisSearchRankingService.updateScore(keyword.trim());

        // 10개씩 페이징 처리해줌
        PageRequest pageRequest = PageRequest.of(page-1, 20);

        List<Music> musicList = searchRepository.findBySinger(keyword, pageRequest);

        return builder(musicList);
    }

    public List<SearchResponseDto> searchByLyric(String sentence, int page) {

        // 10개씩 페이징 처리해줌
        PageRequest pageRequest = PageRequest.of(page-1, 20);

        List<Music> musicList = searchRepository.findAllByLyric(sentence, pageRequest);

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
