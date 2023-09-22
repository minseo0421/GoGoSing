import axios from 'axios';
import React, { useRef } from 'react';
import { Modal } from 'react-native';
import WebView from 'react-native-webview';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function NaverLogin ({toggleModal}:any) {
    const webViewRef = useRef<any>(null); // WebView 컴포넌트의 ref
    const login = (code:string) => {
        toggleModal('')
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
     <WebView
        source={{
            uri: `${process.env.EXPO_PUBLIC_NAVER_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          console.log(data)
          if (data.startsWith('http://j9b305.p.ssafy.io:8081/')) {
            const startIndex = data.indexOf('code='); // "code=" 문자열의 시작 인덱스 찾기
            if (startIndex !== -1) {
                const code = data.slice(startIndex + 5); // 5는 "code=" 문자열의 길이입니다.
                login(code)
            }
            else {
                alert('로그인실패')
                toggleModal('');
            }
          }
        }}
        />
    </Modal>
  );
};
export default NaverLogin;