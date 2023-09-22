import axios from 'axios';
import React, { useRef } from 'react';
import { Modal, TouchableOpacity, Text } from 'react-native';
import WebView from 'react-native-webview';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function GoogleLogin ({toggleModal}:any) {
    const webViewRef = useRef<any>(null); // WebView 컴포넌트의 ref
    const login = (code:string) => {
        axios({
            method:'post',
            url:'',
            data:{code:code},
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
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
        source={{
            uri: `${process.env.EXPO_PUBLIC_GOOGLE_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          if (data.startsWith('http://j9b305.p.ssafy.io:8081/')) {
            const startIndex = data.indexOf('code='); // "code=" 문자열의 시작 인덱스 찾기
            if (startIndex !== -1) {
              // "code=" 이후의 값 추출
              const code = data.slice(startIndex + 5); // 5는 "code=" 문자열의 길이입니다.
              login(code)
            }
          }
        }}
        />
    </Modal>
 
        
  );
};
export default GoogleLogin;