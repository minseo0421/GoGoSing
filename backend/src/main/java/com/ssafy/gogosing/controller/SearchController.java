package com.ssafy.gogosing.controller;

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

    @ApiOperation(value = "제목으로 노래 검색")
    @GetMapping("/title")
    public ResponseEntity<?> searchByTitle(@RequestParam("keyword") String keyword) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(searchService.searchByTitle(keyword));
    }
}
