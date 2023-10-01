package com.ssafy.gogosing.repository.SearchRepository;

import com.ssafy.gogosing.domain.music.Music;

import java.util.List;

public interface SearchCustomRepository {

    List<Music> findAllByTitle(String[] keywords);

//    List<Music> findAllByLyric(String sentence);
}
