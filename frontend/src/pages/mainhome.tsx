import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import CardLong from "../components/CardComponents/CardLong";
import CardLongContainer from "../components/CardComponents/CardLongContainer";

function MainHome() {
  return (
    <View style={styles.container}>
      <CardLongContainer></CardLongContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default MainHome;
