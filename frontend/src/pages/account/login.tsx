import React from 'react';
import styled from './account.module.css'
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate()

    // 카카오 로그인 반응
    const kakaologin = () => {
        navigate('/socialsignup')
    }
    // 네이버 로그인 반응
    const naverlogin = () => {
        navigate('/socialsignup')
    }
    // 구글 로그인 반응
    const googlelogin = () => {
        navigate('/socialsignup')
    }
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'100px 0'}}/>
        <button className={styled.sociallogin_btn} onClick={kakaologin}>
            <img src="assets/kakao_logo.png" alt="" style={{width:'30px'}}/>
            <span style={{marginLeft:'20px'}}>카카오로 로그인하기</span>
        </button>
        <button className={styled.sociallogin_btn} onClick={naverlogin}>
            <img src="assets/naver_logo.png" alt="" style={{width:'30px'}}/>
            <span style={{marginLeft:'20px'}}>네이버로 로그인하기</span>
        </button>
        <button className={styled.sociallogin_btn} onClick={googlelogin}>
            <img src="assets/google_logo.png" alt="" style={{width:'30px'}}/>
            <span style={{marginLeft:'20px'}}>구글으로 로그인하기</span>
        </button>
        <Link className={styled.link} to='/locallogin'>일반 로그인하러가기!</Link>
      </div>
    );
}
export default Login;
  