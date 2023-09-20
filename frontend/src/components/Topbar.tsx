import React,{useState} from "react";
import { StyleSheet,View,Text,Image, TouchableOpacity } from "react-native";
import LoginModal from "../pages/accounts/Login";

function Topbar({navigation}:any) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <LoginModal visible={isModalVisible} toggleModal={toggleModal} />
        
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
  login: {
    textDecorationLine:'underline',
    color:'white'
  }
});

export default Topbar;