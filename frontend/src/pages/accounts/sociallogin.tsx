import axios from 'axios';
import React, { useRef } from 'react';
import { Modal,TouchableOpacity,Text } from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLogin, setModal } from '../../../store/actions';
import axiosInstance from '../../axiosinstance';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function SocialLogin ({toggleModal,toogleSignUp, social}:any) {
  const webViewRef = useRef<any>(null); // WebView 컴포넌트의 ref
  const dispatch=useDispatch()

  const login = () => {
    axios({
      method:'get',
      url: social ==='kakao' ? `${process.env.EXPO_PUBLIC_KAKAO_URI}` : `${process.env.EXPO_PUBLIC_GOOGLE_URI}`
    }).then(async res=>{
      const token =res.headers['authorization']
      await AsyncStorage.setItem('ACCESS_TOKEN',token);
      await AsyncStorage.setItem('REFRESH_TOKEN',res.headers['authorization-refresh']);
      handleCloseModal()
      if (res.headers['user_role']==='guest') {
        alert('첫 로그인입니다. 추가회원정보 입력을 진행해주세요')
        toogleSignUp()
      } else {
        getuserdata(token)
        alert(social)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
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

  const handleCloseModal = () => {
    // 모달이 닫힐 때 WebView를 초기화하고 모달을 닫음
    if (webViewRef.current) {
      webViewRef.current.reload(); // WebView 초기화
    }
    toggleModal('');
  };
  
  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={handleCloseModal}>
           <TouchableOpacity
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              padding: 10,
              zIndex: 2,
              backgroundColor:'black',
              borderRadius:50,
            }}
            onPress={() => toggleModal('')}>
            <Text style={{color:'white'}}>X</Text>
          </TouchableOpacity>
     <WebView
        userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Mobile Safari/537.36"
        source={{
          uri: social==='kakao' ? `${process.env.EXPO_PUBLIC_KAKAO_URI}` : `${process.env.EXPO_PUBLIC_GOOGLE_URI}` ,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          // console.log(data)
          if (data.startsWith(social==='kakao' ? `${process.env.EXPO_PUBLIC_KAKAO_RES}` : `${process.env.EXPO_PUBLIC_GOOGLE_RES}`)) {
            login()
          } else {
            alert('오류발생')
          }
        }}
        />
    </Modal>
  );
};
export default SocialLogin;