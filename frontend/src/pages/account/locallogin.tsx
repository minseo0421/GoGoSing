import React,{useState} from 'react';
import styled from './account.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LocalLogin: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = () => {
      axios({
        method:'post',
        url:`${process.env.REACT_APP_API_URL}/login`,
        data:{email:email,password:password},
      }).then(res=>{
        const token =res.headers['authorization']
        localStorage.setItem('AccessToken',token);
        localStorage.setItem('RefreshToken',res.headers['authorization-refresh']);
        if (res.headers['user_role']==='first') {localStorage.setItem('user_role','first')}
        navigate('/')
      }).catch(err=>{
        alert(err.response.data)
      })
    }

    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'40% 0 10% 0', width:'50%'}}/>
        <h2>일반 로그인</h2>
        <form style={{width:'70%'}}>
            <input className={styled.input_account} type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete='email'/>
            <p></p>
            <input className={styled.input_account} type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='current-password' />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', margin:'10px 0'}}>
              <Link className={styled.link} to='/findpw'>비밀번호 찾기</Link>
              <Link className={styled.link} to='/signup'>회원가입</Link>
            </div>
    
            <button type='button' onClick={()=>login()}  className={styled.signup_btn}>로그인</button>
        </form>
      </div>
    );
}
export default LocalLogin;
  