package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.global.redis.service.RedisSearchRankingService;
import com.ssafy.gogosing.service.SearchService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    private final RedisSearchRankingService redisSearchRankingService;

    @ApiOperation(value = "제목으로 노래 검색")
    @GetMapping("/title")
    public ResponseEntity<?> searchByTitle(@RequestParam("keyword") String keyword) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(searchService.searchByTitle(keyword));
    }

    @ApiOperation(value = "가수로 노래 검색")
    @GetMapping("/singer")
    public ResponseEntity<?> searchBySinger(@RequestParam("keyword") String keyword) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(searchService.searchBySinger(keyword));
    }

    @ApiOperation(value = "가사로 노래 검색")
    @GetMapping("/lyric")
    public ResponseEntity<?> searchByLyric(@RequestParam("keyword") String sentence) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(searchService.searchByLyric(sentence));
    }

    @ApiOperation(value = "인기 검색어")
    @GetMapping("ranking")
    public ResponseEntity<?> getPopularKeywords(){

        return ResponseEntity.status(HttpStatus.OK)
                .body(redisSearchRankingService.getPopularKeywords());
    }
}
