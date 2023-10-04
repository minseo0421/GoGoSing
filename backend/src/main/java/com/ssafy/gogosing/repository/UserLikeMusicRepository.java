package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeMusic;
import com.ssafy.gogosing.dto.music.response.MusicResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserLikeMusicRepository
        extends JpaRepository<UserLikeMusic, Long> {
    UserLikeMusic findByUserAndMusic(User user, Music music);
    List<UserLikeMusic> findByUserId(Long userId);

    @Query(value = "SELECT m.* " +
            "FROM music m " +
            "INNER JOIN ( " +
                    "SELECT DISTINCT music_id AS recommend_music_id " +
                    "FROM users_like_music " +
                    "WHERE user_id IN ( " +
                            "SELECT DISTINCT user_id " +
                            "FROM users_like_music " +
                            "WHERE music_id IN ( " +
                                    "SELECT music_id " +
                                    "FROM users_like_music " +
                                    "WHERE user_id = :userId " +
                            ") " +
                    ") " +
            ") AS user_like_list " +
            "ON m.music_id = user_like_list.recommend_music_id " +
            "WHERE m.music_id NOT IN ( " +
            "SELECT music_id " +
            "FROM users_like_music " +
            "WHERE user_id = :userId " +
    ") " +
    "ORDER BY m.view_count DESC " +
    "LIMIT 100", nativeQuery = true)
    List<Object> recommendListOnLike(Long userId);
}
