import React,{useEffect, useState} from 'react';
import { Modal, ImageBackground, View, Text, TouchableOpacity, StyleSheet,Platform, Image } from 'react-native';
import axiosInstance from '../../axiosinstance';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '../../../store/state';


function WithDraw ({closeWithdraw}:any) {
    const dispatch = useDispatch()
    const isLogin = useSelector((state: AppState) => state.isLogin);

    return (
    <Modal
        transparent={true}
        animationType="fade"
        onRequestClose={()=>closeWithdraw()}
        >
        <View style={styles.container}>
            <ImageBackground
            source={require('../../../assets/background.png')}
            style={styles.background}
            imageStyle={{borderRadius:30, borderColor: 'white',borderWidth:1}}>
                <Text>회원탈퇴</Text>
                <Text>회원탈퇴를 진행하시려면 패스워드를 확인해주세요.</Text>
            
            </ImageBackground>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:'40%', 
        // backgroundColor:'red',
        position:'absolute',
        top:'30%',
        left:'10%', 
        borderRadius:30
    },
    background: {
        flex:1,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center'
    },
  });
  

export default WithDraw;