import React, { useRef } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import HomeSmall from "./HomeSmall";
import albums from "../CardComponents/album";

const { width, height } = Dimensions.get("window");

const HomeSmallContainer: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {albums.map((album) => {
        return <HomeSmall key={album.id} album={album} />;
      })}
    </ScrollView>
  );
};

export default HomeSmallContainer;

const styles = StyleSheet.create({
  container: {
    height: 170,
    margin: 10,
  },
  contentContainer: {
    flexDirection: "row",
  },
});
