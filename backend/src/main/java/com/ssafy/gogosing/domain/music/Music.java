package com.ssafy.gogosing.domain.music;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "music")
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "singer")
    private String singer;

    @Column(name = "lyricist")
    private String lyricist;

    @Column(name = "composer")
    private String composer;

    @Column(name = "song_img")
    private String songImg;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "genre")
    private int genre;

    @Column(name = "lyric", columnDefinition = "TEXT")
    private String lyric;

    @Column(name = "mr_url")
    private String mrUrl;

    @Column(name = "music_Url")
    private String musicUrl;

    @Column(name = "music_play_time")
    private String musicPlayTime;
}
