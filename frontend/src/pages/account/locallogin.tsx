import React,{useState} from 'react';
import styled from './account.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/actions';
import axiosInstance from '../../axiosinstance';

const LocalLogin: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const getuserdata = (token:string) => {
      axiosInstance({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/user/detail`,
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>{
          dispatch(setLogin(res.data))
          alert('로그인 성공!')
      }).catch(err=>{
        console.log(err)
      })
    }  
    const login = () => {
      axios({
        method:'post',
        url:`${process.env.REACT_APP_API_URL}/login`,
        data:{email:email,password:password},
      }).then(res=>{
        const token =res.headers['authorization']
        localStorage.setItem('AccessToken',token);
        localStorage.setItem('RefreshToken',res.headers['authorization-refresh']);
        getuserdata(token)
        if (res.headers['user_role']==='first') {
          navigate('/genresurvey')
        } else {
          navigate('/')}
      }).catch(err=>{
        console.log(err)
      })
    }

    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <img src="assets/logo.png" alt="" style={{margin:'40% 0 30% 0'}}/>
        <form style={{width:'80%'}}>
            <input className={styled.input_account} type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete='email'/>
            <p></p>
            <input className={styled.input_account} type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='current-password' />
            <p></p>
            <button type='button' onClick={()=>login()}  className={styled.signup_btn}>로그인</button>
        </form>
        <Link className={styled.link} to='/findpw'>비밀번호 찾기</Link>
        <Link className={styled.link} to='/signup'>회원가입</Link>
      </div>
    );
}
export default LocalLogin;
  