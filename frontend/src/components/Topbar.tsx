import React,{useState} from "react";
import { StyleSheet,View,Text,Image, TouchableOpacity, StatusBar, Platform } from "react-native";
import LoginModal from "../pages/loginmodal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPage from "../pages/accounts/mypage";

function Topbar({navigation}:any) {
  const TOKEN = AsyncStorage.getItem('ACCESS_TOKEN');
  const [isModalVisible, setModalVisible] = useState('');
  return (
    <View>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
        {TOKEN!==null ? 
        <TouchableOpacity onPress={()=>setModalVisible('mypage')}>
          <Image source={require('../../assets/default_user.png')} style={styles.profile_img}/>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>setModalVisible('login')}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>}
      </View>
    {isModalVisible=='login' ? <LoginModal toggleModal={(value:string)=>setModalVisible(value)} />:
     isModalVisible == 'mypage' ? <MyPage toggleModal={(value:string)=>setModalVisible(value)} />:null}
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
  profile_img:{
    width: 50, // 이미지의 너비 설정
    resizeMode: 'contain',
  },
  login: {
    textDecorationLine:'underline',
    color:'white'
  }
});

export default Topbar;