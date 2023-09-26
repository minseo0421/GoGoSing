import React,{useEffect} from "react";
import styles from './mypage.module.css'
import axios from "axios";
import { Link } from "react-router-dom";

const MyPage: React.FC = () => {
    useEffect(()=>{
        axios({
            method:'get',
            url:'',
            headers:{
                Authorization:''
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div>
        <div className={styles.myprofile}>
            <div style={{justifyContent:'right',display:'flex',marginRight:'7vw'}}>
                <Link to='/'>닫기</Link>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',padding:'10%',}}>
                <img style={{width:'30%'}} src="assets/default_user.png" alt="" />
                <div className={styles.info}>
                    <p><img src="assets/kakao_logo.png" style={{borderRadius:'50%', width:'25px '}} alt="" />주토끼 님</p>
                    <p>성별 : 남자</p>
                    <p>생년월일 : 1999.99.99</p>
                </div>
            </div>
            <div style={{justifyContent:'space-around',display:'flex', width:'100%', padding:'0 5% 10% 5%',boxSizing:'border-box'}}>
                <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'red'}}>회원정보 수정</button>
                <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'green'}}
                onClick={()=>{localStorage.removeItem('usertoken')}}>로그아웃</button>
            </div>
        </div>
        <div style={{display:'flex', width:'90%', justifyContent:'space-between', padding:'0 5%', alignItems:'center'}}>
            <h2>내가 좋아하는 장르</h2>
            <p>수정하기</p>
        </div>
    </div>

  );
};

export default MyPage;