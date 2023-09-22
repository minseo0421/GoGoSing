import React,{useState} from 'react';
import { ImageBackground, View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Login from './accounts/login';
import SignUp from './accounts/signup';
import LocalLogin from './accounts/locallogin';
import FindPW from './accounts/findpw';
import KakaoLogin from './accounts/sociallogin/kakao';

const LoginModal = ({ toggleModal } : any) => {
  const [currentPage,setCurrentPage]=useState('login')
  return (
    <Modal
    transparent={true}
    animationType="slide"
    // visible={toggleModal}
    onRequestClose={()=>{
      if (currentPage==='login') {
        toggleModal('')
      } else if (currentPage==='locallogin') {
        setCurrentPage('login')
      } else if (currentPage==='signup') {
        setCurrentPage('locallogin')
      } else if (currentPage==='findpw') {
        setCurrentPage('locallogin')
      } 
    }}
    
    >
       <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}>

      {Platform.OS==='ios' ? (<View style={{flex:0.025,marginTop:40}} />):<View style={{flex:0.025}} />}
      
      <TouchableOpacity onPress={()=>{toggleModal('');setCurrentPage('login')}}>
        <Text style={styles.closeText}>닫기</Text>
      </TouchableOpacity>
    
      <View style={styles.logobox}>
        <Text style={styles.logo}>GOGO    SING</Text>
      </View>

      <View style={styles.modalContainer}>
        {currentPage === 'login' ? <Login setCurrentPage={(value:string)=>setCurrentPage(value)} /> :
        currentPage === 'locallogin' ? <LocalLogin setCurrentPage={(value:string)=>setCurrentPage(value)} /> :
        currentPage === 'signup' ? <SignUp setCurrentPage={(value:string)=>setCurrentPage(value)} /> :
        currentPage === 'findpw' ? <FindPW setCurrentPage={(value:string)=>setCurrentPage(value)} /> :
        null}
        {/* <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='locallogin' component={LocalLogin} />
            <Stack.Screen name='signup' component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer> */}
      </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closebtn:{
    flex:0.025,
  },
  closeText:{
    color:'white',
    textAlign:'right',
    marginRight:25,
  },
  background: {
    flex: 1, // 화면 전체를 차지하도록 합니다.
    resizeMode: 'cover', // 이미지 크기 조절 옵션 (다른 옵션도 가능)
  },
  logobox:{
    flex:0.3,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  logo:{
    fontFamily:'logo-font',
    color:'white',
    fontSize:65,
    textAlign:'center'
  },
  modalContainer: {
    flex: 0.675,
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

export default LoginModal;