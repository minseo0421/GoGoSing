import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .min(2, '닉네임 최소 글자는 2자 입니다')
      .max(10, '닉네임 최대 글자는 50자 입니다')
      .required('닉네임을 입력해주세요'),
    gender: Yup.string()
      .oneOf(['MALE', 'FEMALE'], '성별을 선택해주세요')
      .required('성별을 선택해주세요'),
    birthday: Yup.string()
      .required('생년월일을 입력해주세요'),
});

function SignUp({setCurrentPage}:any) {
    const [isCheckNickname, setCheckNickname] = useState(false); // 닉네임 중복검사 체크변수
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const showMode = () => {
      setShowDatePicker(true); // Show the modal date picker
    };
  
    const hideDatePicker = () => {
      setShowDatePicker(false); // Hide the modal date picker
    };
  
    const nicknamecheck = (nickname:string) => {
        // 닉네임 중복 체크 로직 작성
        // axiosInstance를 사용하는 부분도 변경이 필요할 수 있습니다.
        setCheckNickname(true);
    };
    return (
        <View style={styles.container}>
            {/* 회원가입 form */}
            <Formik 
                initialValues={{
                    nickname: '',
                    gender: '',
                    birthday: null}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // 회원가입 요청 로직 -> 로그인 처리까지
                    axios({
                        method: 'post',
                        url: process.env.EXPO_PUBLIC_API_URL+`/user/signup`,
                        data: {
                          nickname: values.nickname,
                          gender: values.gender,
                          birth: values.birthday,
                        },
                    }).then((res) => {
                        setCurrentPage('locallogin')
                    }).catch((err) => {
                        alert('회원가입 실패!');});}}>
                {({ handleChange, handleSubmit, values, errors }) => (
                     <View style={{flex:1, width:290}}>
                         {/* 닉네임 input */}
                         <View style={{ flexDirection: 'row', width:'80%'}}>
                           <TextInput
                             style={styles.input_account}
                             placeholder="닉네임을 입력해주세요."
                             onChangeText={(text) => {
                               handleChange('nickname')(text);
                               setCheckNickname(false);
                             }}/>
                           {/* 올바른 닉네임 입력시 인증버튼 활성화 */}
                           {values.nickname === '' || errors.nickname ? 
                            <TouchableOpacity style={styles.unchk} disabled>
                            <Text>인증</Text>
                          </TouchableOpacity>
                              :<TouchableOpacity style={styles.chk} onPress={() => nicknamecheck(values.nickname)} >
                              <Text>인증</Text>
                            </TouchableOpacity> }
                         </View>
                         <Text>
                           {values.nickname === '' ? (
                             null
                           ) : errors.nickname ? (
                             errors.nickname
                           ) : !isCheckNickname ? (
                             '닉네임 중복체크를 진행해주세요.'
                           ) : (
                             '사용가능한 닉네임입니다.'
                           )}
                         </Text>
         
                         {/* 성별 선택 input */}
                         <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                            <TouchableOpacity style={values.gender==='MALE'? styles.sel:styles.unsel} onPress={() => {
                               handleChange('gender')('MALE');
                             }} >
                              <Text>남자</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={values.gender==='FEMALE'? styles.sel:styles.unsel} onPress={() => {
                               handleChange('gender')('FEMALE');;
                             }} >
                              <Text>여자</Text>
                            </TouchableOpacity>
                         
                         </View>
                         <Text>
                           {values.gender === '' ? (
                             <></>
                           ) : errors.gender ? (
                             errors.gender
                           ) : errors.gender ? (
                             '성별을 선택해주세요.'
                           ) : (
                             '성별 선택완료'
                           )}
                         </Text>
         

                          <TouchableOpacity style={styles.birth} onPress={showMode} >
                            <Text>{values.birthday === null ? '생년월일을 입력해주세요':values.birthday}</Text>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={showDatePicker}
                            mode="date"
                            display='spinner'
                            locale='ko-kr'
                            minimumDate={new Date('1990-01-01')}
                            maximumDate={new Date()}
                            onConfirm={(e)=>{
                              const selectedTimestamp = e.toDateString() || new Date().toDateString(); // 선택된 타임스탬프 또는 기존 날짜의 타임스탬프를 얻습니다.
                              const selectedDate = new Date(selectedTimestamp); // 선택된 타임스탬프를 JavaScript Date 객체로 변환합니다
                              const year = selectedDate.getFullYear();
                              const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                              const day = String(selectedDate.getDate()).padStart(2, '0');
                              const formattedDate = `${year}-${month}-${day}`;
                              
                              hideDatePicker(); // Hide the modal date picker when the date is confirmed
                              handleChange('birthday')(formattedDate);
                            }}
                            onCancel={hideDatePicker} />

                         <Text>
                           {values.birthday === null ? null : errors.birthday ? 
                             `${errors.birthday}` :  '생년월일 입력완료'}
                         </Text>
                         {/* 정상적으로 모든 입력이 되었을때 버튼 활성화 */}
                         {isCheckNickname &&
                         values.gender !== '' &&
                         values.birthday !== null &&
                         !errors.gender &&
                         !errors.birthday ? (
                          <TouchableOpacity style={styles.next} onPress={()=>handleSubmit()}>
                            <Text>가입완료</Text>
                          </TouchableOpacity>) 
                          : (<TouchableOpacity style={styles.unnext} disabled>
                            <Text>가입완료</Text>
                          </TouchableOpacity>)}
                   </View>
                )}

            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:70,
  },
  input_account: {
    backgroundColor: '#D7D7D7',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10, // Border radius should be defined in pixels
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10, // You can control spacing with marginBottom
    color:'#525252'
  },
  unchk:{
    backgroundColor:'#D7D7D7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:50,
    marginLeft:10,
  },
  chk:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:50,
    marginLeft:10,
  },
  next:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:'90%',
    marginHorizontal:'5%'
  },
  unnext:{
    backgroundColor:'#D7D7D7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:'90%',
    marginHorizontal:'5%'
  },
  birth:{
    backgroundColor: '#D7D7D7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:'100%',
    color:'#525252'
  },
  sel:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:'45%',
  },
  unsel:{
    backgroundColor:'#D7D7D7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    height: 50,
    width:'45%',
  }
 
});

export default SignUp;