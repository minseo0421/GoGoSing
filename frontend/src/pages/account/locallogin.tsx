import React from 'react';
import styled from './account.module.css'
import { Link, useNavigate } from 'react-router-dom';

const LocalLogin: React.FC = () => {
    const navigate = useNavigate()
    const login = () => {
        navigate('/')
    }

    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'100px 0'}}/>
        <form onSubmit={login} style={{width:'80%'}}>
            <input className={styled.input_account} type="text" placeholder="이메일" />
            <p></p>
            <input className={styled.input_account} type="password" placeholder="비밀번호" />
            <p></p>
            <button type='submit' className={styled.signup_btn}>로그인</button>
        </form>
        <Link className={styled.link} to='/find'>아아디/비밀번호 찾기</Link>
        <Link className={styled.link} to='/signup'>회원가입</Link>
      </div>
    );
}
export default LocalLogin;
  