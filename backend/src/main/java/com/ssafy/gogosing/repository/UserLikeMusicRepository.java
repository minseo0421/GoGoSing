package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeMusic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLikeMusicRepository
        extends JpaRepository<UserLikeMusic, Long> {
    UserLikeMusic findByUserAndMusic(User user, Music music);
}
