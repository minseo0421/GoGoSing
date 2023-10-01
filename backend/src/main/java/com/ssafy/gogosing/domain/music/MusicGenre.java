package com.ssafy.gogosing.domain.music;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "music_genre")
public class MusicGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "music_genre_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id")
    private Music music;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @Builder
    public MusicGenre(Music music, Genre genre) {
        this.music = music;
        this.genre = genre;
    }
}
