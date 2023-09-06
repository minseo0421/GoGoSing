import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './account.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from '../../components/datepicker';

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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 확인해주세요'),
    nickname: Yup.string()
      .min(2, '닉네임 최소글자는 2자 입니다')
      .max(10, '닉네임 최대글자는 50자 입니다')
      .required('닉네임을 입력해주세요'),
    gender: Yup.string()
      .oneOf(['male', 'female'], '성별을 선택해주세요')
      .required('성별을 선택해주세요'),
    birthday: Yup.string()
      .required('생년월일을 입력해주세요'),
});

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [firstStep, setStep] = useState(false);
    const [isCheckEmail, setCheckEmail] = useState(false) //이메일 중복검사 체크변수
    const [isCheckNickname, setCheckNickname] = useState(false) //닉네임 중복검사 체크변수
    const [isCalender, setCalender] = useState(false);

    const emailcheck = (email:string) => {
        // 지금은 지나가기위한 true 처리 나중에 지워야함
        setCheckEmail(true)
        
        // 이메일 중복 체크 axios 작성
        axios({
            method:'get',
            url:'',
            headers:{
                Authorization:''
            }
        }).then(res=>{
            console.log(res)
            setCheckEmail(true)
        }).catch(err=>{
            console.log(err)
        })
    }
    const nicknamecheck = (nickname:string) => {
        // 지금은 지나가기위한 true 처리 나중에 지워야함
        setCheckNickname(true)
        
        // 닉네임 중복 체크 axios 작성
        axios({
            method:'get',
            url:'',
            headers:{
                Authorization:''
            }
        }).then(res=>{
            console.log(res)
            setCheckNickname(true)
        }).catch(err=>{
            console.log(err)
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            nickname:'',
            gender:'',
            birthday: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // 회원가입 요청 로직
            console.log({'email':values.email,
            'password':values.password})
            navigate('/locallogin')
        },
    });
    
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        {isCalender ? <span style={{margin:'30px'}}></span>:<img src="assets/logo.png" alt="" style={{margin:'100px 0'}}/>}
        {/* 회원가입 form */}
        <form onSubmit={formik.handleSubmit} style={{width:'80%'}}>
            {firstStep ? 
            <>
                {/* 이메일 input */}
                <div style={{display:'flex'}}>
                    <input className={styled.input_account} type="text" placeholder="이메일을 입력해주세요." {...formik.getFieldProps('email')} onChange={(event) => { formik.handleChange(event); setCheckEmail(false); }}/>
                    {/* 올바른 이메일 입력시 인증버튼 활성화 */}
                    {formik.values.email==='' || formik.errors.email ? 
                    <button className={styled.checkemail} type="button" disabled>인증</button>
                    :<button className={styled.checkemail} type="button" onClick={()=>{emailcheck(formik.values.email)}}>인증</button>
                    }
                </div>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.email === '' ? <span>　</span> : formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : !isCheckEmail ? <span style={{color:'yellowgreen'}}>이메일 중복체크를 진행해주세요.</span>: <span style={{color:'green'}}>사용가능한 이메일입니다.</span> }
                </p>

                {/* 패스워드 input */}
                <input className={styled.input_account} type="password" placeholder="비밀번호" {...formik.getFieldProps('password')}/>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.password === '' ? <span>　</span> : formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : <span style={{color:'green'}}>사용할 수 있는 비밀번호입니다.</span>}
                </p>
                
                {/* 패스워드 확인 input */}
                <input className={styled.input_account} type="password" placeholder="비밀번호 확인" {...formik.getFieldProps('confirmPassword')}/>
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
                    <input className={styled.input_account} type="text" placeholder="닉네임을 입력해주세요." {...formik.getFieldProps('nickname')} onChange={(event) => { formik.handleChange(event); setCheckNickname(false); }}/>
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
                    <button className={`${formik.values.gender==='male' ? styled.sel_gender : styled.unsel_gender}`} type='button' onClick={()=>{formik.setFieldValue('gender', 'male');}} style={{marginRight:'5px'}}>남자</button>
                    <button className={`${formik.values.gender==='female' ? styled.sel_gender : styled.unsel_gender}`} type='button' onClick={()=>{formik.setFieldValue('gender', 'female');}} style={{marginLeft:'5px'}}>여자</button>
                </div>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left',  color:'red'}}>
                {formik.values.gender === '' ? <span>　</span> : formik.errors.gender ? <span>{formik.errors.gender}</span> : formik.errors.gender ? <span>성별을 선택해주세요.</span>:<span style={{color:'green'}}>성별 선택완료</span>}
                </p>

                <button className={styled.input_account} type='button' onClick={()=>{setCalender(true)}}>
                    {formik.values.birthday === null ? '연도. 월. 일.' : new Date(formik.values.birthday).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}
                </button>
                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.birthday === null ? <span>　</span> : formik.errors.birthday ? <span style={{color:'red'}}>{formik.errors.birthday}</span> : <span style={{color:'green'}}>생년월일 입력완료</span>}
                </p>

                {/* 정상적으로 모든 입력이 되었을때 버튼 활성화 */}
                {isCheckNickname && formik.values.gender!=='' && formik.values.birthday!==null && !formik.errors.gender && !formik.errors.birthday ?
                <button type='submit' className={styled.signup_btn}>가입완료</button>
                :
                <button className={styled.signup_btn} disabled>가입완료</button>}

            </>
            
            }
        </form>
        {isCalender ? 
            <DatePicker onCalender={()=>setCalender(false)} birth={formik.values.birthday} onBirth={(value)=>{formik.setFieldValue('birthday',value)}}/>
        :null}
      </div>
    );
}
export default SignUp;
  