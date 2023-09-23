import axios from 'axios';
import React, { useRef } from 'react';
import { Modal, TouchableOpacity, Text } from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLogin, setModal } from '../../../../store/actions';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function GoogleLogin ({toggleModal,toogleSignUp}:any) {
    const webViewRef = useRef<any>(null); // WebView 컴포넌트의 ref
    const dispatch=useDispatch()

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
        source={{
            uri: `${process.env.EXPO_PUBLIC_GOOGLE_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          if (data.startsWith(`${process.env.EXPO_PUBLIC_GOOGLE_RES}`)) {
            axios({
              method:'get',
              url:`${process.env.EXPO_PUBLIC_GOOGLE_URI}`
            }).then(async res=>{
              await AsyncStorage.setItem('ACCESS_TOKEN',res.headers['authorization']);
              await AsyncStorage.setItem('REFRESH_TOKEN',res.headers['authorization-refresh']);
              handleCloseModal()
              if (res.headers['user_role']==='guest') {
                alert('첫 로그인입니다. 추가회원정보 입력을 진행해주세요')
                toogleSignUp()
              } else {
                alert('로그인 성공!')
                dispatch(setModal(null))
                dispatch(setLogin(true))
              }
              
            }).catch(err=>{
              console.log(err)
            })
          }
        }}
        />
    </Modal>
 
        
  );
};
export default GoogleLogin;