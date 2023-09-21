import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import CardLongContainer from "../components/CardComponents/CardLongContainer";
import CardSmallContainer from "../components/CardComponents/CardSmallContainer";

function MainHome() {
  return (
    <View style={styles.container}>
      <CardSmallContainer></CardSmallContainer>
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
