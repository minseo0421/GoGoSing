import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  PanResponder,
} from "react-native";
import CardSmall from "./CardSmall";
const { width, height } = Dimensions.get("window");
const CardSmallContainer: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <CardSmall />
      <CardSmall />
      <CardSmall />
      <CardSmall />
      <CardSmall />
      <CardSmall />
    </ScrollView>
  );
};

export default CardSmallContainer;

const styles = StyleSheet.create({
  container: {
    height: height * 0.175, // 180 for content height and 20 for margin
    margin: 10,
  },
  contentContainer: {
    flexDirection: "row",
  },
});
