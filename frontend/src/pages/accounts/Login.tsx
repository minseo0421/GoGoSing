import React from 'react';
import { Image, ImageBackground, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const LoginModal = ({ visible, toggleModal } : any) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={toggleModal}
    >
       <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}>
      <View style={styles.closebtn}>

      </View>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.closeText}>닫기</Text>
      </TouchableOpacity>
      <View style={styles.logobox}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo}/>

      </View>
      <View style={styles.modalContainer}>

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
    marginRight:25
  },
  background: {
    flex: 1, // 화면 전체를 차지하도록 합니다.
    resizeMode: 'cover', // 이미지 크기 조절 옵션 (다른 옵션도 가능)
  },
  logobox:{
    flex:0.3
  },
  logo:{
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginModal;