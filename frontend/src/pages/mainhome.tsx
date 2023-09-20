import { StyleSheet, View, Text, Button } from "react-native";
import React from 'react';

function MainHome() {
  return (
    <View style={styles.container}>
      <Text>테스트입니다</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MainHome;
