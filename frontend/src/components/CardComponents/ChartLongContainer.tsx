import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import ChartLong from "./ChartLong";
import albums from "../CardComponents/album"; // 앨범 데이터를 import 합니다.

const ChartLongContainer: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {albums.map((album) => {
        return <ChartLong key={album.id} album={album} />; // 각 ChartLong 컴포넌트에 album 데이터를 prop으로 전달합니다.
      })}
    </ScrollView>
  );
};

export default ChartLongContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
