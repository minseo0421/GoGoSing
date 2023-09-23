import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ChartLongContainer from "../components/CardComponents/ChartLongContainer";

const MusicChart = () => {
  return (
    <View style={{flex:1}}>
      <View style={styles.topbar}>
        <View style={styles.container}>
          <Text style={{color:'white',fontSize:35, fontWeight:'bold'}}>인기차트</Text>
          <View style={{flexDirection:'row', width:'90%', justifyContent:'space-between', marginTop:10}}>
            <TouchableOpacity>
              <Text style={{color:'white',fontSize:16}}>인기차트</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:'white',fontSize:16}}>목소리 추천</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:'white',fontSize:16}}>음역대 추천</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:'white',fontSize:16}}>뭐추천</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <ChartLongContainer></ChartLongContainer>
    </View>
  );
};

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
export default MusicChart;