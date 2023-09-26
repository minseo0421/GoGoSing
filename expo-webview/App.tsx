import { useEffect, useRef, useState } from 'react'
import { ToastAndroid , BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const INJECTEDJAVASCRIPT = `
const meta = document.createElement('meta'); 
meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); 
meta.setAttribute('name', 'viewport'); 
document.getElementsByTagName('head')[0].appendChild(meta); 
window.scrollTo(0, 0);`

export default function App() {
  const webview = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [count, setCount] = useState(false);
  const onAndroidBackPress = (): boolean => {
    if (webview.current) {
      webview.current.goBack();
      return true; // prevent default behavior (exit app)
    } else {
      // BackHandler.exitApp();
      return false
      // if (count) {
        
    
      // } else {
      //   setCount(true)
      //   return true;
      // }
    }

  };
  // useEffect(()=>{
  //   if (count) {
  //     setTimeout(() => {
  //       setCount(false)
  //     }, 2000);
  //   } else {return;}
  // },[count])

  useEffect((): (() => void) => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return (): void => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []); // Never re-run this effect
  return (
    <WebView source={{uri:'https://j9b305.p.ssafy.io'}} 
    ref={webview}
    scrollEnabled={false}
    injectedJavaScript={INJECTEDJAVASCRIPT}
    scalesPageToFit={false}
    bounces={false}
    // onNavigationStateChange={(navState)=>{
    //   setCanGoBack(navState.canGoBack)
    // }}
    />
  );
}

