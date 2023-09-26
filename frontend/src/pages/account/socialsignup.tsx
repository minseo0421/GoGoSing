import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './account.module.css'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../../axiosinstance';
import ko from 'date-fns/locale/ko';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/actions';

const validationSchema = Yup.object().shape({
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

const SocialSignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
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
        // 지금은 지나가기위한 true 처리 나중에 지워야함
        setCheckNickname(true)
        
        // 닉네임 중복 체크 axiosInstance 작성
        axiosInstance({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/user/signup`,
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
            const AccessToken = localStorage.getItem('AccessToken')
            // 회원가입 요청 로직 -> 로그인 처리까지
            axiosInstance({
                method:'post',
                url:`${process.env.REACT_APP_API_URL}/user/signup-plus`,
                data:{'nickname':values.nickname,
                'gender':values.gender,
                'birth':values.birthday},
                headers:{
                    Authorization: 'Bearer ' + AccessToken,
                }
            }).then(res=>{
                console.log(res)
                dispath(setLogin(res.data))
                navigate('/')
            }).catch(err=>{
                console.log(err)
                alert('회원가입 실패!')
            })

        },
    });
    
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        {isDatePickerOpen ? <span style={{margin:'30px'}}></span>:<img src="assets/logo.png" alt="" style={{margin:'40% 0 30% 0'}}/>}
        {/* 회원가입 form */}
        <form onSubmit={formik.handleSubmit} style={{width:'80%'}}>
            {/* 이메일 input */}
            
            <>
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
                    <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    locale={ko}
                    inline
                    readOnly
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    />
                )}

                <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
                    {formik.values.birthday === null ? <span>　</span> : formik.errors.birthday ? <span style={{color:'red'}}>{formik.errors.birthday}</span> : <span style={{color:'green'}}>생년월일 입력완료</span>}
                </p>

                {/* 정상적으로 모든 입력이 되었을때 버튼 활성화 */}
                {isDatePickerOpen ? <button type='button' className={styled.signup_btn} onClick={()=>setIsDatePickerOpen(false)}>완료</button>
                : isCheckNickname && formik.values.gender!=='' && formik.values.birthday!==null && !formik.errors.gender && !formik.errors.birthday ?
                <button type='submit' className={styled.signup_btn}>가입완료</button>
                :
                <button className={styled.signup_btn} disabled>가입완료</button>}
            </>
        </form>
      </div>
    );
}
export default SocialSignUp;
  