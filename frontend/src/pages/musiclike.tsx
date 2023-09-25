// MainHome.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Pitch from "../components/CardComponents/Pitch";
import Voice from "../components/CardComponents/Voice";
import ChartLong from "../components/CardComponents/ChartLong";

const MusicLike = () => {
  const [selectedSong, setSelectedSong] = useState("liked");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topbar}>
        <View style={styles.homecontainer}>
          <Text style={styles.barStyle}>보관함</Text>
        </View>
      </View>

      <View style={styles.likeAndRecoded}>
        <TouchableOpacity onPress={() => setSelectedSong("liked")}>
          <Text style={styles.barStyle}>찜한 노래</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSong("recorded")}>
          <Text style={styles.barStyle}>녹음 한 노래</Text>
        </TouchableOpacity>
      </View>
      <View>
        {selectedSong === "liked" && <ChartLong></ChartLong>}
        {selectedSong === "recorded" && (
          <ScrollView style={styles.scrollcontainer}>
            <Voice></Voice>
            <Pitch></Pitch>
          </ScrollView>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topbar: {
    marginTop: 20,
    flex: 0.15,
    width: "100%",
  },
  barStyle: {
    fontSize: 30,
    color: "white",
    marginHorizontal: "5%",
  },
  homecontainer: {
    marginTop: 20,
    width: "100%", // 이 줄을 추가
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 80, // 이미지의 너비 설정
    resizeMode: "contain",
  },
  // 좋아요 or 녹음 노래 선택 container
  likeAndRecoded: {
    display: "flex",
    fontSize: 30,
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  songContainer: {},

  voiceContainer: {
    display: "flex",
    justifyContent: "center",
  },
  scrollcontainer: {
    width: "100%",
  },
});

export default MusicLike;
