import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './account.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from '../../components/datepicker';

const validationSchema = Yup.object().shape({
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

const SocialSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [isCheckNickname, setCheckNickname] = useState(false) //닉네임 중복검사 체크변수
    const [isCalender, setCalender] = useState(false);
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
            nickname:'',
            gender:'',
            birthday: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // 회원가입 요청 로직 -> 로그인 처리까지
            console.log({
            'gender':values.gender,
            'birthday':new Date(values.birthday!),
            'nickname':values.nickname})
            navigate('/genresurvey')
        },
    });
    
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
        {isCalender ? <span style={{margin:'30px'}}></span>:<img src="assets/logo.png" alt="" style={{margin:'100px 0'}}/>}
        {/* 회원가입 form */}
        <form onSubmit={formik.handleSubmit} style={{width:'80%'}}>
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

            <button className={styled.input_account} type='button' onClick={()=>{
                setCalender(true);
                const divElement = document.getElementById('motiondiv');
                if (divElement) {
                    divElement.style.transform = 'none';
                }
                }}>
                {formik.values.birthday === null ? '생년월일을 선택해주세요.' : new Date(formik.values.birthday).toLocaleDateString('ko-KR', {
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
        
        </form>
        {isCalender ? 
            <DatePicker onCalender={()=>setCalender(false)} birth={formik.values.birthday} onBirth={(value)=>{formik.setFieldValue('birthday',value)}}/>
        :null}
      </div>
    );
}
export default SocialSignUp;
  