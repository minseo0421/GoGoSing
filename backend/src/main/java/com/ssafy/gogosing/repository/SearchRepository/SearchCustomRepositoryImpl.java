package com.ssafy.gogosing.repository.SearchRepository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.music.QMusic;

import javax.persistence.EntityManager;
import java.util.List;

public class SearchCustomRepositoryImpl implements SearchCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    QMusic music = QMusic.music;

    public SearchCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<Music> findAllByTitle(String[] keywords) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String keyword : keywords) {
            builder.and(music.title.contains(keyword));
        }

        List<Music> musicList = jpaQueryFactory.select(music)
                .from(music)
                .where(builder)
                .orderBy(
                        music.title.length().asc(),
                        music.releaseDate.desc()
                )
                .fetch();
        return musicList;
    }
}
