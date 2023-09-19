import React from "react";
import { StyleSheet,View,Text,Image, TouchableOpacity } from "react-native";

function Topbar({navigation}:any) {
  // const usertoken = localStorage.getItem('usertoken')
  // const location = useLocation();
  // isMain 프로퍼티도 구조 분해 할당으로 가져옴
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      <TouchableOpacity onPress={()=>{navigation.navigate("chart")}}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginTop:20,
    flexDirection: 'row', // 가로 방향으로 자식 요소 정렬
    justifyContent: 'space-between', // 주 축을 따라 공간을 동일하게 분배
    alignItems: 'center', // 교차 축을 따라 중앙 정렬
    paddingHorizontal: 16, // 가로 간격 추가 (원하는 만큼 조절)
  },
  logo: {
    width: 80, // 이미지의 너비 설정
    resizeMode: 'contain',
  },

});

export default Topbar;