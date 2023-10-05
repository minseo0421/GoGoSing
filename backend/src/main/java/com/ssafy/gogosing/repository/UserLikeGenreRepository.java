package com.ssafy.gogosing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.domain.user.UserLikeGenre;

public interface UserLikeGenreRepository extends JpaRepository<UserLikeGenre, Long> {
List<UserLikeGenre> findByUserId(Long userId);

	void deleteByUser(User user);
}
