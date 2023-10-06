package com.ssafy.gogosing.repository.SearchRepository;

import com.ssafy.gogosing.domain.music.Music;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SearchCustomRepository {

    List<Music> findAllByTitle(String[] keywords, Pageable pageable);

//    List<Music> findAllByLyric(String sentence);
}
