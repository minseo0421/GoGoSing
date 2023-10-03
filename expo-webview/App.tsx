import { useEffect, useRef, useState } from 'react'
import { ToastAndroid , BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const INJECTEDJAVASCRIPT = `
const meta = document.createElement('meta'); 
meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); 
meta.setAttribute('name', 'viewport'); 
document.getElementsByTagName('head')[0].appendChild(meta); 
window.scrollTo(0, 0);
// MutationObserver 콜백 함수
function handleMutation(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // 자식 노드의 변화가 감지되면 console.log(1) 출력
        var add = mutation.addedNodes;
        if (add.length >0) {
          window.ReactNativeWebView.postMessage('open') 
        }
        else {window.ReactNativeWebView.postMessage('close') }
    }
  }
}

// MutationObserver 생성 및 설정
const observerConfig = { childList: true };
const observer = new MutationObserver(handleMutation);

// 감시할 대상 요소를 선택
const targetNode = document.querySelector("#musicdetailmodal");
const targetNode2 = document.querySelector("#genremodal");
// MutationObserver 시작
observer.observe(targetNode, observerConfig);
observer.observe(targetNode2, observerConfig);
`

export default function App() {
  const webview = useRef<WebView>(null);
  const [modal, setModal] = useState(false);
  
  const onAndroidBackPress = (): boolean => {
    if (webview.current) {
      if (!modal) {
        webview.current.goBack();
      } else {
        const javascriptCode = `
          // 웹페이지 내의 버튼 선택
          var button = document.querySelector("#musicdetailmodal > div > button");
          var button2 = document.querySelector("#genremodal > div > button");
          // 버튼이 존재하면 클릭
          if (button) {
            button.click();
          }
          if (button2) {
            button2.click();
          }
        `;
        webview.current.injectJavaScript(javascriptCode);
        setModal(false)
      }
      return true;
    } else {
      // BackHandler.exitApp();
      return false
    }
  };

  useEffect((): (() => void) => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return (): void => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [modal]); // Never re-run this effect
  
  return (
    <WebView source={{uri:'https://j9b305.p.ssafy.io/'}} 
    ref={webview}
    scrollEnabled={false}
    injectedJavaScript={INJECTEDJAVASCRIPT}
    scalesPageToFit={false}
    bounces={false}
    onMessage={(e)=>{
      if (e.nativeEvent.data==='open') {
        setModal(true)
      } else {
        setModal(false)
      }
    }}
    />
  );
}

