package com.ssafy.gogosing.repository;

import com.ssafy.gogosing.domain.music.PopularChart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PopularChartRepository extends JpaRepository<PopularChart, Byte> {
	List<PopularChart> findAllByOrderByRankingAsc();
}
