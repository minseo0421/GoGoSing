package com.ssafy.gogosing.global.redis.service;

import com.ssafy.gogosing.dto.search.response.SearchRankingResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RedisSearchRankingService {

    private final StringRedisTemplate redisTemplate;

    @Transactional
    public void updateScore(String keyword) {
        String key = "search_keywords";

        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Long result = zSetOperations.reverseRank(key, keyword);

        if(result == null)
            zSetOperations.add(key, keyword, 1);
        else
            zSetOperations.incrementScore(key, keyword, 1);
    }

    public List<SearchRankingResponseDto> getPopularKeywords() {

        String key = "search_keywords";

        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        // 10위까지
        int topN = 10;
        Set<String> ranking = zSetOperations.reverseRange(key, 0, topN-1);
        List<String> rankingList = new ArrayList<>(ranking);

//        // 점수 사용할 거면 쓰기
//        Set<ZSetOperations.TypedTuple<String>> rankingWithScores = zSetOperations.reverseRangeWithScores(key, 0, -1);
//        List<Long> valueList = new ArrayList<>();
//        for (ZSetOperations.TypedTuple<String> tuple : rankingWithScores)
//            valueList.add(tuple.getScore().longValue());

        List<SearchRankingResponseDto> result = new ArrayList<>();

        for(int i = 0; i < rankingList.size(); i++) {
            SearchRankingResponseDto searchRankingResponseDto = SearchRankingResponseDto.builder()
                    .rank(zSetOperations.reverseRank(key, rankingList.get(i)) + 1)
                    .keyword(rankingList.get(i))
                    .build();

            result.add(searchRankingResponseDto);
        }

        return result;
    }


//    @Scheduled(fixedRate = 120000) // 현재 시간으로부터 2분 후에 실행 (2분 = 120,000 밀리초)
//    @Scheduled(cron = "0 0 0 * * ?") //매일 자정에 실행
    @Scheduled(cron = "0 0 * * 1 *") // 매주 월요일 0시 0분에 실행
    public void cleanupRedisKey() {
        String keyPattern = "search_keywords"; // 삭제할 키 패턴 설정

        // 특정 패턴을 가진 키를 조회하여 삭제
        Set<String> keysToDelete = redisTemplate.keys(keyPattern);
        if (keysToDelete != null && !keysToDelete.isEmpty()) {
            redisTemplate.delete(keysToDelete);
            System.out.println("Deleted " + keysToDelete.size() + " keys.");
        } else {
            System.out.println("No keys to delete.");
        }
    }

}
