import React from 'react';
import { Image, ImageBackground, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

function Login ({onModal}:any) {
  const kakaologin = () => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    // 여기에서 웹 브라우저를 열거나 카카오 네이티브 SDK를 사용하여 로그인을 처리합니다.
  }

  // 네이버 로그인 반응
  const naverlogin = () => {
      const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
      const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
      // 여기에서 웹 브라우저를 열거나 네이버 네이티브 SDK를 사용하여 로그인을 처리합니다.
  }

  // 구글 로그인 반응
  const googlelogin = () => {
      const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
      // 여기에서 웹 브라우저를 열거나 구글 네이티브 SDK를 사용하여 로그인을 처리합니다.
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.sociallogin_btn} onPress={kakaologin}>
            <Image source={require('../../../assets/kakao_logo.png')} style={styles.social_img} />
            <Text style={{ marginLeft: 20 }}>카카오로 로그인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sociallogin_btn} onPress={naverlogin}>
            <Image source={require('../../../assets/naver_logo.png')} style={styles.social_img}/>
            <Text style={{ marginLeft: 20 }}>네이버로 로그인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sociallogin_btn} onPress={googlelogin}>
            <Image source={require('../../../assets/google_logo.png')} style={styles.social_img}/>
            <Text style={{ marginLeft: 20 }}>구글로 로그인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onModal}>
            <Text style={styles.locallogin}>일반 로그인하러가기!</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sociallogin_btn:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(215, 215, 215, 0.8)',
    color: 'rgb(82, 82, 82)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10, 
    width: 275,
    height: 50,
    paddingHorizontal: 50, // padding 속성도 paddingHorizontal와 같이 사용합니다.
    marginVertical: 10, // margin 속성도 marginVertical과 같이 사용합니다.
  },
  social_img:{
    width:30,
    resizeMode: 'contain',
  },
  locallogin:{
    color:'white',
    textDecorationLine:'underline',
    marginTop:50

  }
});

export default Login;