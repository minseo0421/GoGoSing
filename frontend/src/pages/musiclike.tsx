// MainHome.js
import React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

const MusicLike = () => {
  return (
    <View style={{flex:1}}>
      <View style={styles.topbar}>
        <View style={styles.container}>
          <Text style={{color:'white',fontSize:35, fontWeight:'bold'}}>검색</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topbar :{
    flex:0.2,
    width:'100%',
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center', // 교차 축을 따라 중앙 정렬
    marginTop:20
    
  },
});

export default MusicLike;