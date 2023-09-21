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
  },
});
