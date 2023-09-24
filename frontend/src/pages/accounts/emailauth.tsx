import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Modal, ImageBackground, View, Text, TouchableOpacity, StyleSheet,TextInput,Keyboard } from 'react-native';

function EmailAuth ({email, closeCheckAuth, authsuccess}:any) {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [isnum,setnum]=useState('')
    const [isTime, setTime] = useState(300); // 3분은 180초

    useEffect(() => {
        if (isTime > 0) {
          const timer = setTimeout(() => {
            setTime(isTime - 1);
          }, 1000); // 1초마다 1초씩 감소
    
          return () => {
            clearTimeout(timer);
          };
        } else {
            closeCheckAuth();
          }
      }, [isTime]);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardOpen(true);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardOpen(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const checknum = () => {
        axios({
            method:'post',
            url:`${process.env.EXPO_PUBLIC_URI}/email/verify`,
            data:{email:email,certificationNumber:isnum}
        }).then(res=>{ 
            authsuccess(isnum)
        }).catch(err=>{
            alert('인증실패')
        })
    }
    
    return (
    <Modal
        transparent={true}
        animationType="fade"
        onRequestClose={()=>closeCheckAuth()}
        >
        <View style={[styles.container,isKeyboardOpen? {top:'20%'}:{top:'33%'}]}>
            <ImageBackground
            source={require('../../../assets/background.png')}
            style={styles.background}
            imageStyle={{borderRadius:30, borderColor: 'white',borderWidth:1}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'bold',marginBottom:10}}>이메일 인증</Text>
                <Text>"{email}"로 인증번호가 발송되었습니다</Text>
                <TouchableOpacity onPress={()=>setTime(300)} style={{marginBottom:20}}>
                    <Text style={{color:'white'}}>(시간연장)</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input_account}
                    placeholder="인증번호를 입력해주세요"
                    onChangeText={(text) => setnum(text)}
                    />
             
                <Text>0{Math.floor(isTime/60)}:{isTime%60 <10 ? '0'+isTime%60: isTime%60}</Text>
    
                <View style={{flexDirection:'row', width:'90%',justifyContent:'space-evenly'}}>
                    <TouchableOpacity style={styles.check} onPress={()=>checknum()}>
                        <Text>확인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.check} onPress={()=>closeCheckAuth()}>
                        <Text>취소</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:300, 
        position:'absolute',
        left:'10%', 
    },
    background: {
        flex:1,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center'
    },
    input_account: {
        backgroundColor: '#D7D7D7',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10, // Border radius should be defined in pixels
        width: '80%',
        height: 50,
        paddingHorizontal: 20,
        marginBottom: 10, // You can control spacing with marginBottom
        color:'#525252'
      },
    check:{
       backgroundColor:'#D7D7D7',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        height: 50,
        width:'40%',
        marginHorizontal:'5%',
        marginTop:20,
    },
  });
  

export default EmailAuth;