import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/actions";
import { AppState } from "../../store/state";
import { Audio } from "expo-av";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface AlbumProps {
  album: {
    id: number;
    title: string;
    singer: string;
    image: any;
    url: string;
    lyrics: string;
  };
}

// interface MusicDetailProps {
//   isModalOpen: boolean;
//   album: AlbumProps["album"];
// }

const MusicDetail: React.FC = () => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const isModalOpen = useSelector(
    (state: AppState) => state.isModalOpen === "musicDetail"
  );
  const album = useSelector((state: AppState) => state.album);

  const [play, setPlay] = useState(false);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: album.url });
      setSoundObject(sound);
    };

    loadSound();

    return () => {
      soundObject?.unloadAsync();
    };
  }, []);

  const handlePlayPause = async () => {
    if (!soundObject) return;

    if (play) {
      await soundObject.pauseAsync();
      setPlay(false);
    } else {
      await soundObject.playAsync();
      setPlay(true);
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={isModalOpen}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
      >
        {Platform.OS === "ios" ? (
          <View style={{ flex: 0.025, marginTop: 40 }} />
        ) : (
          <View style={{ flex: 0.025 }} />
        )}

        <TouchableOpacity onPress={() => dispatch(setModal(null))}>
          <Text style={[styles.closeText, styles.closebtn]}>닫기</Text>
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <ImageBackground
            source={album.image}
            style={styles.withBackground}
            blurRadius={5}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{album.title}</Text>
              <Text style={styles.singer}>{album.singer}</Text>
            </View>
            <Image source={album.image} style={styles.image} />

            <View style={styles.playIconsContainer}>
              <TouchableOpacity>
                <Image
                  style={[styles.playIcon]} // 첫 번째, 두 번째 아이콘에 간격 추가
                  source={require("../../assets/previousSong.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayPause}>
                {play ? (
                  <Image
                    style={[styles.playIcon]} // 중간 아이콘에 양쪽 간격 추가
                    source={require("../../assets/pause.png")}
                  />
                ) : (
                  <Image
                    style={[styles.playIcon]} // 중간 아이콘에 양쪽 간격 추가
                    source={require("../../assets/play.png")}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={[styles.playIcon]} // 세 번째 아이콘에 간격 추가
                  source={require("../../assets/nextSong.png")}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <ScrollView
            style={styles.lyricsContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.lyricsText}>{album.lyrics}</Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bluredImage: {},
  closebtn: {
    fontSize: 20,
    // position: "relatvie",
    // top: Platform.OS === "ios" ? 40 : 10,
    left: 5,
    zIndex: 9999, // 이 값을 높게 설정하여 다른 요소보다 앞에 나오게 합니다.
  },
  playIcon: {
    height: 50, // 높이 50 제한
    resizeMode: "contain", // 이미지의 원래 비율을 유지하면서 높이에 맞게 조절합니다.
  },
  closeText: {
    color: "white",
    textAlign: "right",
    marginRight: 25,
  },
  background: {
    flex: 1, // 화면 전체를 차지하도록 합니다.
    resizeMode: "cover", // 이미지 크기 조절 옵션 (다른 옵션도 가능)
    justifyContent: "center", // 세로 방향으로 중앙 정렬
    alignItems: "center", // 가로 방향으로 중앙 정렬
    borderRadius: 15, // 테두리 둥글게 처리
  },

  image: {
    width: 170,
    resizeMode: "contain",
    marginBottom: 10,
    flex: 0.5, // 높이 조절
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
  },

  singer: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  playIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.3, // 높이 조절
    width: "80%",
    // height: "60%",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
  },
  withBackground: {
    flex: 0.6, // 크기 조절
    width: "90%", // width 조절
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20, // 테두리 둥글게 처리
  },

  titleContainer: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.2, // 높이 조절
  },

  lyricsContainer: {
    flex: 0.4,
    width: "100%",
  },

  lyricsText: {
    fontSize: 20,
    color: "white",
    textAlign: "left",
    lineHeight: 36,
  },
});

export default MusicDetail;
