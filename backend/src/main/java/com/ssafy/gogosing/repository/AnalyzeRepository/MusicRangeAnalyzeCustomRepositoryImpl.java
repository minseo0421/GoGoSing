package com.ssafy.gogosing.repository.AnalyzeRepository;

import com.ssafy.gogosing.domain.analyze.MusicRangeAnalyze;

import javax.persistence.EntityManager;
import java.util.List;
import javax.persistence.Query;

public class MusicRangeAnalyzeCustomRepositoryImpl implements MusicRangeAnalyzeCustomRepository {

//    private final JPAQueryFactory jpaQueryFactory;
    private final EntityManager em;

    public MusicRangeAnalyzeCustomRepositoryImpl(EntityManager em) {
//        this.jpaQueryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public List<MusicRangeAnalyze> findMatchingListByMaxPitch(double maxPitch) {
//        QMusicRangeAnalyze musicRangeAnalyze = QMusicRangeAnalyze.musicRangeAnalyze;

        // EntityManager를 사용하여 SQL 쿼리를 직접 작성하고 랜덤 값을 부여합니다.
        Query query = em.createNativeQuery(
                        "SELECT mra.* " +
                                "FROM music_range_analyze mra " +
                                "JOIN music m ON mra.music_id = m.music_id " +
                                "WHERE mra.max_pitch < :maxPitch " +
                                "ORDER BY mra.max_pitch DESC, m.view_count DESC " +
                                "LIMIT 100", MusicRangeAnalyze.class)
                .setParameter("maxPitch", maxPitch);

        // 쿼리 실행 및 결과를 가져옵니다.
        return query.getResultList();
    }
}
