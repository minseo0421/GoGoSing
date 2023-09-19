import React from 'react';
import styled from './account.module.css'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    // 카카오 로그인 반응
    const kakaologin = () => {
        const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    }
    // 네이버 로그인 반응
    const naverlogin = () => {
        const CIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CIENT_ID}&state=${1234}&redirect_uri=${REDIRECT_URI}`
    }
    // 구글 로그인 반응
    const googlelogin = () => {
        const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid email profile`
    }
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'10% 0 30% 0'}}/>
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
  