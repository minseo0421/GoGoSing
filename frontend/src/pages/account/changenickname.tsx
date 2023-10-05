import React, {useState} from "react";
import styles from './changenickname.module.css'
import axiosInstance from "../../axiosinstance";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

interface userdata { 
  socialType: string;
  nickname: string;
  gender: string;
  birth: string;
  profileImg: string | null;    
}
interface Props {
    closemodal: ()=>void;
    isLogin:userdata;
    setLogin:(value:userdata)=>void
}

const validationSchema = Yup.object().shape({
  nickname: Yup.string()
  .min(2, '닉네임 최소글자는 2자 입니다')
  .max(6, '닉네임 최대글자는 6자 입니다')
  .required('닉네임을 입력해주세요'),
});

const ChangeNickName: React.FC<Props> = ({closemodal,isLogin,setLogin}) => {
  const [isCheckNickname, setCheckNickname] = useState(false) //닉네임 중복검사 체크변수
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
  const formik = useFormik({
    initialValues: {
        nickname: '', 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        // 비밀번호 변경 요청 로직
        axiosInstance({
            method:'put',
            url:`${process.env.REACT_APP_API_URL}/user/update/nickname?nickname=${values.nickname}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
        }).then(res=>{
          const change=isLogin
          change.nickname=values.nickname
          setLogin(change)
          closemodal()
        }).catch(err=>{
            console.log(err)

        })

    },
});

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <span style={{display:'flex',justifyContent:'right'}} onClick={()=>closemodal()}>닫기</span>
        <h2 style={{margin:0}}>닉네임 변경</h2>
        <form onSubmit={formik.handleSubmit}>
          <p style={{display:'flex'}}>현재 닉네임 : {isLogin.nickname}</p>
          <div style={{display:'flex'}}>
              <input className={styles.input_account} type="text" placeholder="닉네임을 입력해주세요." {...formik.getFieldProps('nickname')} onChange={(event) => { formik.handleChange(event); setCheckNickname(false); }} autoComplete='username'/>
              {/* 올바른 닉네임 입력시 인증버튼 활성화 */}
              {formik.values.nickname==='' || formik.errors.nickname ? 
              <button className={styles.checkemail} type="button" disabled>인증</button>
              :<button className={styles.checkemail} type="button" onClick={()=>{nicknamecheck(formik.values.nickname)}}>인증</button>
              }
          </div>
          <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'left'}}>
              {formik.values.nickname === '' ? <span>　</span> : formik.errors.nickname ? <span style={{color:'red'}}>{formik.errors.nickname}</span> : !isCheckNickname ? <span style={{color:'yellowgreen'}}>닉네임 중복체크를 진행해주세요.</span>: <span style={{color:'green'}}>사용가능한 닉네임입니다.</span> }
          </p>
          <div style={{marginTop:'1%'}}>
              <button style={{width:'40%',marginRight:'10%'}} type='submit'>변경</button>
              <button style={{width:'40%'}} type='button' onClick={()=>{closemodal()}}>취소</button>
          </div>
        </form>
    </div>
    </div>
  );
};

export default ChangeNickName;