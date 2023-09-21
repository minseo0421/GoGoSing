import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const CardSmall: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={require("./assets/sample1.png")} style={styles.image} />
        <View style={styles.musicinfo}>
          <View style={styles.musictext}>
            <Text
              style={[styles.text, styles.title]}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              Super 슈퍼슈퍼슈퍼 Shy
            </Text>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              NewJeans
            </Text>
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
    </View>
  );
};

export default CardSmall;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: width * 0.35,
    height: "100%",
  },
  image: {
    flex: 8,
    // height: "100%",
    width: "100%",
    // margin: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  musicinfo: {
    // flex: "1",
    flexDirection: "row",
    // maxWidth: "50%",
  },
  musictext: {
    flex: 1,
    maxWidth: "75%",
  },
  text: {
    width: "100%",
    fontSize: 14,
    overflow: "hidden",
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  singer: {
    fontSize: 16,
  },
  icon: {
    fontSize: 24,
    color: "red",
    marginTop: 5,
    marginLeft: 5,
    // width: "20%",
  },
});
