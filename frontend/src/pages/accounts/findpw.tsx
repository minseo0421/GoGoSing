import React,{useState} from 'react';
import { Button, TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axiosInstance from '../../axiosinstance';

function FindPW ({setCurrentPage}:any) {
    const [email, setEmail] = useState('');
    
    return (
        <View style={styles.container}>
            <Text style={{color:'white',fontSize:20,margin:20,fontWeight:'bold'}}>패스워드 찾기</Text>
            <TextInput style={styles.input_account}
                placeholder="이메일"
                value={email}
                onChangeText={(text) => setEmail(text)}/>
        
            <TouchableOpacity style={styles.findButton} onPress={()=>{}}>
                <Text>비밀번호 찾기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  findButton:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FFCBCB',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20, // Border radius should be defined in pixels
    width: 120,
    height: 50,
    margin:70,
  },
});

export default FindPW;