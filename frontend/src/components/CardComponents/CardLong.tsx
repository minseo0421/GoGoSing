import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // We use Expo's AntDesign for icons

const { width, height } = Dimensions.get("window");
const CardLong: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={require("./assets/sample1.png")} style={styles.image} />
        <View style={styles.musicInfo}>
          <Text style={[styles.text, styles.title]}>
            Super 슈퍼슈퍼슈퍼 Shy
          </Text>
          <Text style={styles.text}>NewJeans</Text>
        </View>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          {liked ? (
            <AntDesign name="heart" style={styles.icon} />
          ) : (
            <AntDesign name="hearto" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CardLong;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.08,
    marginBottom: 10,
  },
  image: {
    width: "20%",
    height: "100%",
    marginLeft: 20,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20, // 오른쪽에서 하트 아이콘을 20만큼 떨어트리기 위한 여백
  },
  musicInfo: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 15,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    overflow: "hidden",
    color: "white",
  },
  title: {
    fontWeight: "bold",
  },
  icon: {
    fontSize: 24,
    color: "red",
  },
});
