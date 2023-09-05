import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './account.module.css'
import { useNavigate } from 'react-router-dom';
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 확인해주세요'),
});

const SignUp: React.FC = () => {
    const navigate = useNavigate()

    const [isCheckEmail, setCheckEmail] = useState(false) //이메일 중복검사 체크변수

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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
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
        <img src="assets/logo.png" alt="" style={{margin:'100px 0'}}/>
        
        {/* 회원가입 form */}
        <form onSubmit={formik.handleSubmit} style={{width:'80%'}}>
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
            <button type='submit' className={styled.signup_btn}>가입하기</button>
            :
            <button className={styled.signup_btn} disabled>가입하기</button>}
        </form>
     
      </div>
    );
}
export default SignUp;
  