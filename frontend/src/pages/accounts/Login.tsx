import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';


import axios from 'axios';

import SocialLogin from './sociallogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosinstance';
import { useDispatch } from 'react-redux';
import { setGenreSel, setLogin, setModal } from '../../../store/actions';

function Login ({setCurrentPage}:any) {
  const [isLoginModal, setLoginModal] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const getuserdata = (token:string) => {
    axiosInstance({
      method:'get',
      url:`${process.env.EXPO_PUBLIC_URI}/user/detail`,
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
        dispatch(setLogin(res.data))
        alert('로그인 성공!')
        dispatch(setModal(null))
    }).catch(err=>{
      console.log(err)
      alert('유저 데이터 로딩 실패')
    })
  }
  const login = () => {
    // Your login logic here
    axios({
      method:'post',
      url: `${process.env.EXPO_PUBLIC_URI}/login`,
      data: {
        email: email,
        password: password,
      },
    }).then(async res=>{      
      const token =res.headers['authorization']
      await AsyncStorage.setItem('ACCESS_TOKEN',token);
      await AsyncStorage.setItem('REFRESH_TOKEN',res.headers['authorization-refresh']);
      getuserdata(token)
      if (res.headers['user_role']==='first') {
        dispatch(setGenreSel(true))
      }
    }).catch(err=>{
      console.log(err)
    })
  };
  return (
    <View style={styles.container}>
      {isLoginModal ? <SocialLogin toggleModal={(value:string)=>{setLoginModal(value);}} toogleSignUp={()=>setCurrentPage('socialsignup')} social={isLoginModal}/> : null}
      <View style={{justifyContent:'center',alignItems:'center', width:'80%', borderRadius:20}}>
        {/* <Text style={{color:'white', marginTop:10, marginBottom:10, fontWeight:'bold', fontSize:16}}>일반 로그인</Text> */}
        <TextInput style={styles.input_account}
                  placeholder="이메일"
                  value={email}
                  onChangeText={(text) => setEmail(text)}/>
        <TextInput style={styles.input_account}
            placeholder="비밀번호"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry/>

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%', marginBottom:10,marginTop:10,}}>
          <TouchableOpacity onPress={()=>setCurrentPage('findpw')}>
              <Text style={styles.link}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setCurrentPage('signup')}>
              <Text style={styles.link}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text>로그인</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginTop:20, marginBottom:20, color:'white'}}>------------- 소셜 로그인 -------------</Text>
      <View style={{flexDirection:'row', justifyContent:'space-evenly', width:'30%'}}>
        <TouchableOpacity onPress={()=>{setLoginModal('kakao')}}>
            <Image source={require('../../../assets/kakao_logo.png')} style={styles.social_img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setLoginModal('google')}}>
            <Image source={require('../../../assets/google_logo.png')} style={styles.social_img}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop:70,
    width:'100%',
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
    width:40,
    height:40,
    resizeMode: 'contain',
    borderRadius:50
  },
  locallogin:{
    color:'white',
    textDecorationLine:'underline',
    marginTop:50

  },
  input_account: {
    backgroundColor: '#D7D7D7',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10, // Border radius should be defined in pixels
    width: '90%',
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10, // You can control spacing with marginBottom
    color:'#525252'
  },
  link:{
    color:'white',
    textDecorationLine:'underline'
  },
  loginButton:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#797DC5',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20, // Border radius should be defined in pixels
    width: 120,
    height: 50,
    marginBottom: 20, 
  },
});

export default Login;