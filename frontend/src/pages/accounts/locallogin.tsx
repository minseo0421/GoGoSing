import React,{useState} from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axiosInstance from '../../axiosinstance';

function LocalLogin ({setCurrentPage}:any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = () => {
      // Your login logic here
      axiosInstance({
        method:'post',
        url:'',
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    };
    return (
        <View style={styles.container}>
          <Text style={{color:'white',fontSize:20,margin:20,fontWeight:'bold'}}>일반 로그인</Text>
            <TextInput style={styles.input_account}
                placeholder="이메일"
                value={email}
                onChangeText={(text) => setEmail(text)}/>
            <TextInput style={styles.input_account}
                placeholder="비밀번호"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry/>
        
            <TouchableOpacity style={styles.loginButton} onPress={login}>
                <Text>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setCurrentPage('findpw')}>
                <Text style={styles.link}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setCurrentPage('signup')}>
                <Text style={styles.link}>회원가입</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop:70,
    alignItems: 'center',
  },
  input_account: {
    backgroundColor: '#D7D7D7',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10, // Border radius should be defined in pixels
    width: 250,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10, // You can control spacing with marginBottom
    color:'#525252'
  },
  link:{
    color:'white',
    textDecorationLine:'underline'
  },
  loginButton:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FFCBCB',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20, // Border radius should be defined in pixels
    width: 120,
    height: 50,
    marginBottom: 20, 
  },
});

export default LocalLogin;