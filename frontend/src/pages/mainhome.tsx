import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import HomeSmallContainer from "../components/CardComponents/HomeSmallContainer";

function MainHome() {
  return (
    <View style={styles.container}>
      <HomeSmallContainer></HomeSmallContainer>
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
