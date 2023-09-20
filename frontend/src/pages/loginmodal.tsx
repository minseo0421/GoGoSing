import React from 'react';
import { Image, ImageBackground, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Login from './accounts/login';
import SignUp from './accounts/signup';
import LocalLogin from './accounts/locallogin';
// const Stack = createStackNavigator();

const LoginModal = ({ visible, toggleModal } : any) => {

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={toggleModal}
    >
       <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}>
      <View style={styles.closebtn}>

      </View>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.closeText}>닫기</Text>
      </TouchableOpacity>
      <View style={styles.logobox}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      </View>
      <View style={styles.modalContainer}>

        <Login></Login>
        {/* <SignUp></SignUp> */}

        {/* <LocalLogin></LocalLogin> */}
      </View>
      {/* <NavigationContainer>
        <View style={styles.modalContainer}>
          <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
          </Stack.Navigator>

        </View>
      </NavigationContainer> */}
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
    marginRight:25
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
    width:250,
    height:120,
    resizeMode: 'contain',
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