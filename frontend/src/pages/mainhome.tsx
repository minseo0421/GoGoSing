import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeSmallContainer from "../components/CardComponents/HomeSmallContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/actions";
import { AppState } from "../../store/state";

function MainHome() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: AppState) => state.isLogin);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topbar}>
        <View style={styles.homecontainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
          {isLogin ? (
            <TouchableOpacity onPress={() => dispatch(setModal("mypage"))}>
              <Image
                source={require("../../assets/default_user.png")}
                style={styles.profile_img}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => dispatch(setModal("login"))}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView style={{ flex: 0.8 }}>
        <Text style={styles.barStyle}>🎤 당신의 음역대에 맞는 음악 ! 🎤</Text>
        <HomeSmallContainer></HomeSmallContainer>
        <Text style={styles.barStyle}>
          😍 뭘 좋아 할 지 몰라서 다 준비했어😍
        </Text>
        <HomeSmallContainer></HomeSmallContainer>
        <Text style={styles.barStyle}>🎸 이런 장르의 음악 좋아하시죠? 🎹</Text>
        <HomeSmallContainer></HomeSmallContainer>
        <Text style={styles.barStyle}>
          👩🏻 연령대에 맞춰서 추천해볼게요 ! 👨🏻
        </Text>
        <HomeSmallContainer></HomeSmallContainer>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  barStyle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 24,
    color: "white",
  },
  topbar: {
    flex: 0.2,
    width: "100%",
  },
  homecontainer: {
    marginTop: 20,
    flexDirection: "row", // 가로 방향으로 자식 요소 정렬
    justifyContent: "space-between", // 주 축을 따라 공간을 동일하게 분배
    alignItems: "center", // 교차 축을 따라 중앙 정렬
    paddingHorizontal: 16, // 가로 간격 추가 (원하는 만큼 조절)
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // 교차 축을 따라 중앙 정렬
    marginTop: 20,
  },
  logo: {
    width: 80, // 이미지의 너비 설정
    resizeMode: "contain",
  },
  profile_img: {
    width: 50, // 이미지의 너비 설정
    resizeMode: "contain",
  },
  login: {
    textDecorationLine: "underline",
    color: "white",
  },
});
export default MainHome;
