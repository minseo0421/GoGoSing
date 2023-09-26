import React,{ useState } from "react";
import styles from './findpw.module.css'
import axios from "axios";

const FindPassWord: React.FC = () => {
  const [email, setEmail] =useState('')
  const findpw = () => {
    if (!email) {
      alert('이메일을 입력해주세요')
      return
    }
    axios({
      method:'post',
      url:`${process.env.REACT_APP_API_URL}/email/tempPassword`,
      data:{email:email},
    }).then(res=>{
      alert('임시 비밀번호가 발급되었습니다.')
    }).catch(err=>{
      alert('email not found!')
    })
  }
  return (
    <div>
      <img src="assets/logo.png" alt="" style={{margin:'40% 0 30% 0'}}/>
      <h1>패스워드 찾기</h1>
      <input className={styles.input_account} type="email" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete='current-password' />
      <p></p>
      <button type='button' onClick={()=>findpw()}  className={styles.findbtn}>로그인</button>
    </div>
  );
};

export default FindPassWord;