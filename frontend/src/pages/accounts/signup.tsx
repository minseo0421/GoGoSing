import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet,Button,Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../axiosinstance';
import DateTimePicker from '@react-native-community/datetimepicker';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일은 형식에 맞춰 입력해주세요.')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/, '이메일은 형식에 맞춰 입력해주세요.')
      .max(50, '이메일의 글자 수는 50자 이내로 설정해주세요')
      .required('이메일을 입력해주세요'),
    certificationNumber:Yup.string()
      .required('인증번호를 입력해주세요'),
    password: Yup.string()
      .min(9, '9 자 이상, 영문/숫자/특수문자 1개 이상 포함')
      .max(15, '15 자 이하의 패스워드를 입력해주세요')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,15}$/, '영문/숫자/특수문자 1개 이상 포함')
      .required('비밀번호를 입력해주세요'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 확인해주세요'),
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

function SignUp() {

    const [firstStep, setStep] = useState(true);
    const [isCheckEmail, setCheckEmail] = useState(false); // 이메일 중복검사 체크변수
    const [isCheckAuth, setCheckAuth] = useState(false); // 이메일 중복검사 체크변수
    const [isCheckNickname, setCheckNickname] = useState(false); // 닉네임 중복검사 체크변수
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const showMode = () => {
      setShowDatePicker(true);
    };
  

    const emailcheck = (email:string) => {
        // 이메일 인증번호 발송 로직
        // axiosInstance를 사용하는 부분도 변경이 필요할 수 있습니다.
        axiosInstance({
          method:'post',
          url:`${process.env.EXPO_PUBLIC_API_URL}/email/send-certification`,
          data:{email:email}
        }).then(res=>{
          setCheckEmail(true);
        }).catch(err=>{
          // alert('인증번호 전송에 실패했습니다.')
          alert(err)
        })
      };
    
    const emailauth = (email:string,num:string) =>{
      // 인증번호 확인
      axiosInstance({
        method:'post',
        url:`${process.env.EXPO_PUBLIC_API_URL}/email/verify`,
        data:{email:email,
          certificationNumber:num}
      }).then(res=>{
        setCheckAuth(true);
      }).catch(err=>{
        alert('인증에 실패했습니다. 다시 확인해주세요')
      })
    }
    
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
                    email: '',
                    password: '',
                    confirmPassword: '',
                    certificationNumber:'',
                    nickname: '',
                    gender: '',
                    birthday: null}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  // print(process.env.API_BASE_URL)
                    // 회원가입 요청 로직 -> 로그인 처리까지
                    axiosInstance({
                        method: 'post',
                        url: `${process.env.EXPO_PUBLIC_API_URL}/user/signup`,
                        data: {
                        email: values.email,
                        password: values.password,
                        nickname: values.nickname,
                        gender: values.gender,
                        birth: values.birthday,
                        },
                    }).then((res) => {
                        console.log(res);
                        alert('성공')
                    }).catch((err) => {
                        console.log(err);
                        alert('회원가입 실패!');});}}>
                {({ handleChange, handleSubmit, values, errors }) => (
                     <View style={{flex:1, width:290}}>
                     {firstStep ? (
                       <>
                         {/* 이메일 input */}
                         <View style={{ flexDirection: 'row', width:'80%'}}>
                           <TextInput
                             style={styles.input_account}
                             placeholder="이메일을 입력해주세요."
                             onChangeText={(text) => {
                               handleChange('email')(text);
                               setCheckEmail(false);}}/>
                           {/* 올바른 이메일 입력시 인증버튼 활성화 */}
                           {values.email === '' || errors.email ? 
                           <TouchableOpacity style={styles.unchk} disabled>
                            <Text>인증</Text>
                          </TouchableOpacity>
                    
                             :<TouchableOpacity style={styles.chk} onPress={() => emailcheck(values.email)} >
                             <Text>인증</Text>
                           </TouchableOpacity> }
                         </View>

                        {isCheckEmail ? 
                         <View style={{ flexDirection: 'row', width:'80%'}}>
                         <TextInput
                           style={styles.input_account}
                           placeholder="인증번호를 입력해주세요."
                           onChangeText={(text) => {
                             handleChange('certificationNumber')(text);}}/>
                         {/* 올바른 이메일 입력시 인증버튼 활성화 */}
                         {values.certificationNumber === '' || errors.certificationNumber ? 
                         <TouchableOpacity style={styles.unchk} disabled>
                          <Text>인증</Text>
                        </TouchableOpacity>
                  
                           :<TouchableOpacity style={styles.chk} onPress={() => emailauth(values.email,values.certificationNumber)} >
                           <Text>인증</Text>
                         </TouchableOpacity> }
                       </View>:null}
                         
                         <Text>
                           {values.email === '' ? (
                            <></>
                           ) : errors.email ? (
                             errors.email
                           ) : !isCheckEmail ? (
                             '이메일 인증을 진행해주세요.'
                           ) : isCheckAuth ? (
                             '인증완료'
                           ): '인증번호가 발송되었습니다.'}
                         </Text>    

                         {/* 패스워드 input */}
                         <TextInput
                           style={styles.input_account}
                           placeholder="비밀번호"
                           onChangeText={(text) => handleChange('password')(text)}
                           secureTextEntry
                         />
                         <Text>
                           {values.password === '' ? (
                             <></>
                           ) : errors.password ? (
                             errors.password
                           ) : (
                             '사용할 수 있는 비밀번호입니다.'
                           )}
                         </Text>
         
                         {/* 패스워드 확인 input */}
                         <TextInput
                           style={styles.input_account}
                           placeholder="비밀번호 확인"
                           onChangeText={(text) => handleChange('confirmPassword')(text)}
                           secureTextEntry
                         />
                         <Text>
                           {values.confirmPassword === '' ? (
                             <></>
                           ) : errors.confirmPassword ? (
                             errors.confirmPassword
                           ) : errors.password ? (
                             '비밀번호를 확인해주세요.'
                           ) : (
                             '비밀번호가 일치합니다.'
                           )}
                         </Text>
         
                         {/* 정상적으로 모든 입력이 되었을때 버튼 활성화 */}
                         {isCheckEmail &&
                         values.password !== '' &&
                         values.confirmPassword !== '' &&
                         !errors.password &&
                         !errors.confirmPassword ? (
                          <TouchableOpacity style={styles.next} onPress={() => {setStep(false);}}>
                            <Text>다음으로</Text>
                          </TouchableOpacity>
                   
                         ) : (
                          <TouchableOpacity style={styles.unnext} disabled>
                            <Text>다음으로</Text>
                          </TouchableOpacity>
                         )}
                       </>
                     ) : (
                       <>
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
                          {showDatePicker && (
                            <DateTimePicker
                              value={date}
                              mode="date"
                              display="spinner"
                              onChange={(e)=>{
                                const selectedTimestamp = e.nativeEvent.timestamp || date.getTime(); // 선택된 타임스탬프 또는 기존 날짜의 타임스탬프를 얻습니다.
                                const selectedDate = new Date(selectedTimestamp); // 선택된 타임스탬프를 JavaScript Date 객체로 변환합니다.
                                setShowDatePicker(Platform.OS === 'ios');
                                setDate(selectedDate);
                                handleChange('birthday')(selectedDate.toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit'}))
                              }}
                              locale='ko-kr'
                              minimumDate={new Date('1990-01-01')}
                              maximumDate={new Date()}/>)}
           

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
                          <TouchableOpacity style={styles.next} onPress={()=>handleSubmit}>
                            <Text>가입완료</Text>
                          </TouchableOpacity>) 
                          : (<TouchableOpacity style={styles.unnext} disabled>
                            <Text>가입완료</Text>
                          </TouchableOpacity>)}
                       </>
                     )}
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