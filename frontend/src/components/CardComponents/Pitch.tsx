import React, { useEffect, useState } from "react";
import {
  Modal,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/state";
import axiosInstance from "../../axiosinstance";

function Pitch() {
  const isLogin = useSelector((state: AppState) => state.isLogin);
  return (
    <TouchableOpacity
      style={{
        width: "80%",
        backgroundColor: "rgba(217,217,217,0.2)",
        borderRadius: 10,
        height: 130,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#C0CEFF", fontSize: 12 }}>
        {isLogin?.nickname}님의
      </Text>
      <Text style={{ color: "#C0CEFF", fontSize: 12 }}>
        음역대는 레3 ~ 도4 입니다.
      </Text>
      <Text style={{ color: "white", marginTop: 10 }}>음역대 수정하기 →</Text>
    </TouchableOpacity>
  );
}

export default Pitch;
