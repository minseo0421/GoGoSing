import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, ImageBackground,Platform,TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setGenreSel } from '../../store/actions';


const GenreSelect = () => {
  const [isSelGenres,setSelGenres]=useState<String[]>([])
  const dispatch = useDispatch()

  const checkGenre = (value:string) => {
    if (isSelGenres.includes(value)) {
      setSelGenres(isSelGenres.filter((genre) => genre !== value))
    } 
    else {
      if (isSelGenres.length >= 3){
        alert('이미 3개임')
      }
      else {setSelGenres([...isSelGenres, value]);}
    }
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={()=>dispatch(setGenreSel(false))}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}>
        {Platform.OS==='ios' ? (<View style={{flex:0.025,marginTop:40}} />):<View style={{flex:0.05}} />}
            <TouchableOpacity onPress={()=>{dispatch(setGenreSel(false))}} style={{position:'absolute',top:20,right:20, width:30,height:30, backgroundColor:'rgba(217,217,217,0.2)',borderRadius:50,
            alignItems:'center',justifyContent:'center'}}>
                <Text>X</Text>
            </TouchableOpacity>
            <View style={{width:'95%',marginLeft:'auto',flex:0.18}}>
              <Text style={{color:'white', fontSize:30, fontWeight:'bold'}}>좋아하는 장르를</Text>
              <Text style={{color:'white', fontSize:30, fontWeight:'bold'}}>선택해주세요!</Text>
              <Text style={{color:'white', fontSize:20}}>(최대 3개까지 선택할 수 있어요)</Text>
            </View>

            <View style={{flex:0.625,width:'85%',marginLeft:'auto',marginRight:'auto'}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20,}}>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('발라드')}>
                  <Image source={isSelGenres.includes('발라드') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('댄스')}>
                  <Image source={isSelGenres.includes('댄스') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('POP')}>
                  <Image source={isSelGenres.includes('POP') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20,}}>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('랩/힙합')}>
                  <Image source={isSelGenres.includes('랩/힙합') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('R&B/Soul')}>
                  <Image source={isSelGenres.includes('R&B/Soul') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('인디음악')}>
                  <Image source={isSelGenres.includes('인디음악') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20,}}>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('록/메탈')}>
                  <Image source={isSelGenres.includes('록/메탈') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('포크/블루스')}>
                  <Image source={isSelGenres.includes('포크/블루스') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('OST')}>
                  <Image source={isSelGenres.includes('OST') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20,}}>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('트로트')}>
                  <Image source={isSelGenres.includes('트로트') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('동요')}>
                  <Image source={isSelGenres.includes('동요') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.unsel_genre}  onPress={()=>checkGenre('CCM')}>
                  <Image source={isSelGenres.includes('CCM') ? require('../../assets/sel_genre_img.png'):require('../../assets/genre_img.png')} style={{width:100,height:100}} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={{flex:0.075,backgroundColor:'#7290FA', width:150, borderRadius:20,justifyContent:'center',alignItems:'center', marginLeft:'auto',marginRight:'auto',
              shadowColor: 'rgba(0, 0, 0, 1)',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8, shadowRadius: 4,  elevation: 10,}}>
                {isSelGenres.length===0 ? <Text style={{color:'white',}}>다음에 하기</Text>
                :<Text style={{color:'white',}}>저장하기</Text>}
           
            </TouchableOpacity>
      </ImageBackground>

    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // 화면 전체를 차지하도록 합니다.
    resizeMode: 'cover', // 이미지 크기 조절 옵션 (다른 옵션도 가능)
  },
  unsel_genre:{
    borderRadius:50, 
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8, 
    shadowRadius: 4,
    elevation: 10
  }
});

export default GenreSelect;