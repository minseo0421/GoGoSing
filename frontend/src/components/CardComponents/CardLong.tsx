import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // We use Expo's AntDesign for icons

const CardLong: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require("./assets/sample1.png")} style={styles.image} />
      <View style={styles.infoContainer}>
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
    height: "25%",
    // marginBottom: 10,
  },
  image: {
    width: "20%",
    height: "60%",
    margin: 20,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 20,
    height: "80%",
    width: "60%",
  },
  musicInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    maxWidth: "80%",
  },
  text: {
    width: "100%",
    fontSize: 14,
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
