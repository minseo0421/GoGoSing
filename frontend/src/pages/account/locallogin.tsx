import React,{useState} from 'react';
import styled from './account.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinstance';

const LocalLogin: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = () => {
      axiosInstance({
        method:'post',
        url:`${process.env.REACT_APP_URL}/login`,
        data:{email:email,password:password},
      }).then(res=>{
        console.log(res)
        navigate('/')
      }).catch(err=>{
        console.log(err)
      })
    }

    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'40% 0 30% 0'}}/>
        <form onSubmit={login} style={{width:'80%'}}>
            <input className={styled.input_account} type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <p></p>
            <input className={styled.input_account} type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <p></p>
            <button type='submit' className={styled.signup_btn}>로그인</button>
        </form>
        <Link className={styled.link} to='/findpw'>비밀번호 찾기</Link>
        <Link className={styled.link} to='/signup'>회원가입</Link>
      </div>
    );
}
export default LocalLogin;
  