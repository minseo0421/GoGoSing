import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import KakaoLogin from './sociallogin/kakao';
import GoogleLogin from './sociallogin/google';
import NaverLogin from './sociallogin/naver';

function Login ({setCurrentPage}:any) {
  const [isLoginModal, setLoginModal] = useState('');
  return (
    <View style={styles.container}>
      {isLoginModal==='kakao' ? <KakaoLogin toggleModal={(value:string)=>{setLoginModal(value);}} toogleSignUp={()=>setCurrentPage('socialsignup')}/> : 
      isLoginModal==='google' ? <GoogleLogin toggleModal={(value:string)=>{setLoginModal(value);}}  toogleSignUp={()=>setCurrentPage('socialsignup')}/> :
      isLoginModal==='naver' ? <NaverLogin toggleModal={(value:string)=>{setLoginModal(value);}}  toogleSignUp={()=>setCurrentPage('socialsignup')}/> :null}
        <TouchableOpacity style={styles.sociallogin_btn} onPress={()=>{setLoginModal('kakao')}}>
            <Image source={require('../../../assets/kakao_logo.png')} style={styles.social_img} />
            <Text style={{ marginLeft: 20 }}>카카오로 로그인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sociallogin_btn} onPress={()=>{setLoginModal('naver')}}>
            <Image source={require('../../../assets/naver_logo.png')} style={styles.social_img}/>
            <Text style={{ marginLeft: 20 }}>네이버로 로그인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sociallogin_btn} onPress={()=>{setLoginModal('google')}}>
            <Image source={require('../../../assets/google_logo.png')} style={styles.social_img}/>
            <Text style={{ marginLeft: 20 }}>구글로 로그인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setCurrentPage('locallogin')}}>
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