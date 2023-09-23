import React,{useEffect, useState} from 'react';
import { Modal, ImageBackground, View, Text, TouchableOpacity, StyleSheet,Platform, Image } from 'react-native';
import axiosInstance from '../../axiosinstance';
import GenreSelect from '../genreselect';
import { useDispatch } from 'react-redux';
import { setGenreSel, setLogin, setModal } from '../../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MyPage () {
    const [userdata,setuserdata] = useState()
    const [isModalVisible, setModalVisible] = useState('');
    const dispatch = useDispatch()
    useEffect(()=>{
        axiosInstance({
            method:''
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return (
    <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={()=>{dispatch(setModal(null))}}
        >
       <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}>

        <ImageBackground source={require('../../../assets/mypage_back.png')} style={styles.mypage_back}>
            {Platform.OS==='ios' ? (<View style={{flex:0.025,marginTop:40}} />):<View style={{flex:0.1}} />}
            {/* <Text>마이페이지</Text> */}
            <TouchableOpacity onPress={()=>{dispatch(setModal(null))}} style={{position:'absolute',top:20,right:20, width:30,height:30, backgroundColor:'rgba(217,217,217,0.2)',borderRadius:50,
        alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity> 

            <View style={{flex:0.6 ,width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flex:0.3, justifyContent:'center'}}>
                    <Image source={require('../../../assets/default_user.png')} style={{resizeMode:'contain'}} />
                    <TouchableOpacity style={{backgroundColor:'purple',borderRadius:100, marginTop:5}}>
                        <Text style={{fontSize:10, color:'white',textAlign:'center'}}>프로필 사진 변경</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infobox}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../../../assets/kakao_logo.png')} style={{borderRadius:50, marginRight:10}}/>
                        <Text style={styles.name}>주토끼 님</Text>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/account_edit.png')} style={{marginRight:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={styles.gender}>성　　별 : 남자</Text>
                        <Text style={styles.gender}>생년월일 : 1995.11.14</Text>
                    </View>
                </View>
            </View>
            <View style={{width:'90%',flex:0.3,flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity style={[styles.btn,styles.btn1]}>
                    <Text style={styles.btntext}>비밀번호 변경</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,styles.btn2]} onPress={async ()=>{
                    dispatch(setLogin(false))
                    await AsyncStorage.removeItem('ACCESS_TOKEN')
                    await AsyncStorage.removeItem('REFRESH_TOKEN')
                    dispatch(setModal(null))
                    }}>
                    <Text style={styles.btntext}>로그아웃</Text>
                </TouchableOpacity>
            </View>
  
        </ImageBackground>
        <View style={{flex:0.55, width:'90%',marginLeft:'auto',marginRight:'auto'}}>
         
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, alignItems:'center'}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'900'}}>내가 좋아하는 장르</Text>
                <TouchableOpacity onPress={()=>dispatch(setGenreSel(true))}>
                    <Text style={{color:'white',fontWeight:'bold'}}>수정하기</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20,paddingBottom:20,borderBottomColor:'white',borderBottomWidth:2}} >
                <Image source={require('../../../assets/genre_img.png')} style={{width:80,height:80}} />
                <Image source={require('../../../assets/genre_img.png')} style={{width:80,height:80}} />
                <TouchableOpacity style={{borderRadius:50, width:80, height:80, justifyContent:'center',alignItems:'center'}}  onPress={()=>dispatch(setGenreSel(true))}>
                    <Image source={require('../../../assets/plus_icon.png')} style={{width:50,height:50}} />
                    <Text style={{color:'#C0CEFF'}}>추가하기</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, alignItems:'center'}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'900'}}>나의 음역대, 음색 데이터 관리</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20,paddingBottom:20,borderBottomColor:'white',borderBottomWidth:2}} >
                <TouchableOpacity style={{width:'48%', backgroundColor:'rgba(217,217,217,0.2)', borderRadius:10, height:130, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#C0CEFF',fontSize:12}}>주토끼님의</Text>
                    <Text style={{color:'#C0CEFF',fontSize:12}}>음역대는 레3 ~ 도4 입니다.</Text>
                    <Text style={{color:'white', marginTop:10}}>음역대 수정하기 →</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'48%', backgroundColor:'rgba(217,217,217,0.2)', borderRadius:10, height:130, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#C0CEFF',fontSize:12}}>나의 음색</Text>
                    <Text style={{color:'#C0CEFF',fontSize:12}}>주토끼 울음소리.mp3</Text>
                    <Text style={{color:'white', marginTop:10}}>목소리 수정하기 →</Text>
                </TouchableOpacity>
            </View>
               <TouchableOpacity style={{ width:'100%', alignItems:'flex-end', marginTop:30}}>
                    <Text style={{color:'red',fontWeight:'bold'}}>회원탈퇴</Text>
                </TouchableOpacity>
        </View>
      </ImageBackground>
    </Modal>
    );
};

const styles = StyleSheet.create({
    closeText:{
      color:'white',
      fontSize:20,
    },
    background: {
      flex: 1, // 화면 전체를 차지하도록 합니다.
      resizeMode: 'cover', // 이미지 크기 조절 옵션 (다른 옵션도 가능)
    },
    mypage_back:{
        flex:0.4,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center'
    },
    infobox : {
        // justifyContent:'center'
        // marginTop:10,
        // marginBottom:10,
        flex:0.6,
        justifyContent:'center'
       
        // marginT
    },
    name:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
    },
    gender:{
        color:'white',
        fontSize:19,
        fontWeight:'bold',
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