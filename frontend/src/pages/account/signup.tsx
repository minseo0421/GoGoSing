import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './account.module.css'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import EmailCheck from './emailcheck';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일은 형식에 맞춰 입력해주세요.')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/, '이메일은 형식에 맞춰 입력해주세요.')
      .max(50, '이메일의 글자 수는 50자 이내로 설정해주세요')
      .required('이메일을 입력해주세요'),
    password: Yup.string()
      .min(9, '9 자 이상, 영문/숫자/특수문자 1개 이상 포함')
      .max(15, '15 자 이하의 패스워드를 입력해주세요')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,15}$/, '영문/숫자/특수문자 1개 이상 포함')
      .required('비밀번호를 입력해주세요'),
    emailCertificationNumber: Yup.string()
      .required('인증번호를 입력해주세요'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 확인해주세요'),
    nickname: Yup.string()
      .min(2, '닉네임 최소글자는 2자 입니다')
      .max(10, '닉네임 최대글자는 50자 입니다')
      .required('닉네임을 입력해주세요'),
    gender: Yup.string()
      .oneOf(['MALE', 'FEMALE'], '성별을 선택해주세요')
      .required('성별을 선택해주세요'),
    birthday: Yup.string()
      .required('생년월일을 입력해주세요'),
});

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [firstStep, setStep] = useState(true);
    const [isCheckEmail, setCheckEmail] = useState(false) //이메일 유효성 검사 체크변수
    const [isChkModal, setChkModal] = useState(false) // 유효성 검사 모달 오픈
    const [isCheckNickname, setCheckNickname] = useState(false) //닉네임 중복검사 체크변수
    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
    const handleDateChange = (date:Date) => {
      setSelectedDate(date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      formik.setFieldValue('birthday',`${year}-${month}-${day}`)
    };
  
    const openDatePicker = () => {
      setIsDatePickerOpen(!isDatePickerOpen);
    };

    const nicknamecheck = (nickname:string) => {
        // 닉네임 중복 체크 axios 작성
        axios({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/user/nicknameCheck?nickname=${nickname}`,
        }).then(res=>{
            setCheckNickname(true)
        }).catch(err=>{
            alert('중복된 닉네임입니다!')
        })
    }
    const emailauth = () => {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/email/send-certification`,
            data:{email:formik.values.email}
        }).then(res=>{
            setChkModal(true)
        })
        .catch(err=>{
            if (err.response.data==='이미 존재하는 이메일입니다.') {
                alert('이미 존재하는 이메일입니다.')
            } else {
                alert('인증번호 전송 실패, 다시 시도해주세요')
            }
        })
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            emailCertificationNumber:'',
            password: '',
            confirmPassword: '',
            nickname:'',
            gender:'',
            birthday: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // 회원가입 요청 로직 -> 로그인 처리까지
            axios({
                method:'post',
                url:`${process.env.REACT_APP_API_URL}/user/signup`,
                data:{'email':values.email,
                'emailCertificationNumber':values.emailCertificationNumber,
                'password':values.password,
                'nickname':values.nickname,
                'gender':values.gender,
                'birth':values.birthday},
            }).then(res=>{
                console.log(res)
                navigate('/locallogin')
            }).catch(err=>{
                console.log(err)
                alert('회원가입 실패!')
            })

        },
    });
    
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'40% 0 10% 0', width:'50%'}}/>
        <h2>회원가입</h2>
        {/* 회원가입 form */}
        {isChkModal && <EmailCheck email={formik.values.email} closemodal={()=>setChkModal(false)} success={(value:string)=>{formik.setFieldValue('emailCertificationNumber',value); setCheckEmail(true);}} />}
        <form onSubmit={formik.handleSubmit} style={{width:'70%'}}>
            {firstStep ? 
            <>
                {/* 이메일 input */}
                <div style={{display:'flex'}}>
                    <input className={styled.input_account} type="text" placeholder="이메일을 입력해주세요." {...formik.getFieldProps('email')} onChange={(event) => { formik.handleChange(event); setCheckEmail(false); }} autoComplete='email'/>
                    {/* 올바른 이메일 입력시 인증버튼 활성화 */}
                    {formik.values.email==='' || formik.errors.email ? 
                    <button className={styled.checkemail} type="button" disabled>인증</button>
                    : isCheckEmail ? <button className={styled.checkemail} disabled type="button" style={{color:'green'}}>완료</button> :
                    <button className={styled.checkemail} type="button" onClick={()=>{emailauth()}}>인증</button>
                    }
                </div>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.email === '' ? <span>　</span> : formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : !isCheckEmail ? <span style={{color:'yellowgreen'}}>이메일 인증을 진행해주세요.</span>: <span style={{color:'green'}}>이메일 인증완료</span> }
                </p>

                {/* 패스워드 input */}
                <input className={styled.input_account} type="password" placeholder="비밀번호" {...formik.getFieldProps('password')} autoComplete="new-password"/>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.password === '' ? <span>　</span> : formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : <span style={{color:'green'}}>사용할 수 있는 비밀번호입니다.</span>}
                </p>
                
                {/* 패스워드 확인 input */}
                <input className={styled.input_account} type="password" placeholder="비밀번호 확인" {...formik.getFieldProps('confirmPassword')}  autoComplete="new-password"/>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left',  color:'red'}}>
                {formik.values.confirmPassword === '' ? <span>　</span> : formik.errors.confirmPassword ? <span>{formik.errors.confirmPassword}</span> : formik.errors.password ? <span>비밀번호를 확인해주세요.</span>:<span style={{color:'green'}}>비밀번호가 일치합니다.</span>}
                </p>
                
                {/* 정상적으로 모든 입력이 되었을때 버튼 활성화 */}
                {isCheckEmail && formik.values.password!=='' && formik.values.confirmPassword!=='' && !formik.errors.password && !formik.errors.confirmPassword ?
                <button type='button' className={styled.signup_btn} onClick={()=>{setStep(false)}}>다음으로</button>
                :
                <button className={styled.signup_btn} disabled>다음으로</button>}
            </>
            :<>
                {/* 닉네임 input */}
                <div style={{display:'flex'}}>
                    <input className={styled.input_account} type="text" placeholder="닉네임을 입력해주세요." {...formik.getFieldProps('nickname')} onChange={(event) => { formik.handleChange(event); setCheckNickname(false); }} autoComplete='username'/>
                    {/* 올바른 닉네임 입력시 인증버튼 활성화 */}
                    {formik.values.nickname==='' || formik.errors.nickname ? 
                    <button className={styled.checkemail} type="button" disabled>인증</button>
                    :<button className={styled.checkemail} type="button" onClick={()=>{nicknamecheck(formik.values.nickname)}}>인증</button>
                    }
                </div>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.nickname === '' ? <span>　</span> : formik.errors.nickname ? <span style={{color:'red'}}>{formik.errors.nickname}</span> : !isCheckNickname ? <span style={{color:'yellowgreen'}}>닉네임 중복체크를 진행해주세요.</span>: <span style={{color:'green'}}>사용가능한 닉네임입니다.</span> }
                </p>

                {/* 성별 선택 input */}
                <div style={{display:'flex'}}>
                    <button className={`${formik.values.gender==='MALE' ? styled.sel_gender : styled.unsel_gender}`} type='button' onClick={()=>{formik.setFieldValue('gender', 'MALE');}} style={{marginRight:'5px'}}>남자</button>
                    <button className={`${formik.values.gender==='FEMALE' ? styled.sel_gender : styled.unsel_gender}`} type='button' onClick={()=>{formik.setFieldValue('gender', 'FEMALE');}} style={{marginLeft:'5px'}}>여자</button>
                </div>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left',  color:'red'}}>
                {formik.values.gender === '' ? <span>　</span> : formik.errors.gender ? <span>{formik.errors.gender}</span> : formik.errors.gender ? <span>성별을 선택해주세요.</span>:<span style={{color:'green'}}>성별 선택완료</span>}
                </p>

                <button className={styled.input_account} type='button' onClick={()=>{openDatePicker()}}>
                    {formik.values.birthday === null ? '생년월일을 선택해주세요.' : `${formik.values.birthday}`}
                </button>

                {isDatePickerOpen && (
                    <div style={{position:'absolute', top:'50%', left:'10%', width:'80%', height:'50%'}}>
                        <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        locale={ko}
                        inline
                        readOnly
                        minDate={new Date('1900-01-01')}
                        maxDate={new Date()}
                        // scrollableYearDropdown
                        // scrollableMonthYearDropdown
                        // scrollableYearDropdown
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        />
                    { isDatePickerOpen && <button type='button' className={styled.signup_btn} onClick={()=>setIsDatePickerOpen(false)}>완료</button>}      

                    </div>
                )}

                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.birthday === null ? <span>　</span> : formik.errors.birthday ? <span style={{color:'red'}}>{formik.errors.birthday}</span> : <span style={{color:'green'}}>생년월일 입력완료</span>}
                </p>

                {/* 정상적으로 모든 입력이 되었을때 버튼 활성화 */}
                { isDatePickerOpen ? null: isCheckNickname && formik.values.gender!=='' && formik.values.birthday!==null && !formik.errors.gender && !formik.errors.birthday ?
                <button type='submit' className={styled.signup_btn}>가입완료</button>
                :
                <button className={styled.signup_btn} disabled>가입완료</button>}
            </>
            }
        </form>
      </div>
    );
}
export default SignUp;
  