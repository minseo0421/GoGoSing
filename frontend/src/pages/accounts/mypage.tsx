import React,{useState} from 'react';
import { Modal, ImageBackground, View, Text, TouchableOpacity, StyleSheet,Platform, Image } from 'react-native';


function MyPage ({toggleModal}:any) {
    return (
    <Modal
        transparent={true}
        animationType="slide"
        // visible={toggleModal}
        onRequestClose={()=>{toggleModal('')}}
        >
       <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}>

        <ImageBackground source={require('../../../assets/mypage_back.png')} style={styles.mypage_back}>
            {Platform.OS==='ios' ? (<View style={{flex:0.025,marginTop:40}} />):<View style={{flex:0.1}} />}
            <TouchableOpacity onPress={()=>{toggleModal('')}}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity> 
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'90%', height:'60%', flexDirection:'row'}}>
                    <Image source={require('../../../assets/default_user.png')} style={{margin:20}}/>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'white'}}>이름 : 주토끼</Text>
                        <Text style={{color:'white'}}>성별 : 남자</Text>
                        <Text style={{color:'white'}}>생년월일 : 1995.11.14</Text>
                    </View>
                </View>
                <View style={{width:'90%', height:'40%', flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={[styles.btn,styles.btn1]}>
                        <Text style={styles.btntext}>비밀번호 변경</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,styles.btn2]}>
                        <Text style={styles.btntext}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
        <View style={{flex:0.55}}>
            <Text>아아아</Text>
        </View>
      {/* <View style={styles.modalContainer}>

 
      </View> */}
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
    mypage_back:{
        flex:0.45,
        resizeMode: 'cover',
    },
    btn:{
        width:'45%',
        height:50, 
        // backgroundColor:'white',
        borderRadius:100,
        justifyContent:'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 1)', // 음영 색상
        shadowOffset: { width: 0, height: 2 }, // 음영 위치 (수평, 수직)
        shadowOpacity: 0.8, // 음영 투명도
        shadowRadius: 4, // 음영 크기
        elevation: 10, // Android에서 음영 효과를 위해 필요한 속성
    },
    btn1:{backgroundColor:'#7290FA'},
    btn2:{backgroundColor:'#F27474'},
    btntext:{
        fontSize:15
    },

  });
  

export default MyPage;