import React, { useRef } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import HomeSmall from "./HomeSmall";
import albums from "../CardComponents/album";

const { width, height } = Dimensions.get("window");

const HomeSmallContainer: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <View style={styles.container}>

      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scroolcontainer}
        contentContainerStyle={styles.contentContainer}
        >
        {albums.map((album) => {
          return <HomeSmall key={album.id} album={album} />;
        })}
      </ScrollView>
    </View>
  );
};

export default HomeSmallContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  scroolcontainer: {
    height: 170,
    margin: 10,
  },
  contentContainer: {
    flexDirection: "row",
  },
});
