package com.ssafy.gogosing.repository.SearchRepository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository
        extends JpaRepository<Music, Long>, SearchCustomRepository {

}
