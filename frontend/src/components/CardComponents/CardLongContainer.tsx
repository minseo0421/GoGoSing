import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import CardLong from "./CardLong";

const CardLongContainer: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
      <CardLong />
    </ScrollView>
  );
};

export default CardLongContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    // flex: 1, // 화면을 꽉 채우게 됩니다.
  },
  //   cardLong: {
  //     height: 80, // 예제로 임의의 높이 값을 설정했습니다. 실제 필요한 값으로 조절하세요.
  //   },
});
