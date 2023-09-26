import React,{useEffect} from "react";
import styled from './account.module.css'
import axios from "axios";

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
    <div className={styled.myprofile}>
        <div className={styled.myinfo}>
            <img src="assets/default_user.png" alt="" />
            <div className={styled.info}>
                <p><img src="assets/kakao_logo.png" style={{borderRadius:'50%', width:'25px '}} alt="" />주토끼 님</p>
                <p>성별 : 남자</p>
                <p>생년월일 : 1999.99.99</p>
            </div>
        </div>

    </div>
   </div>
  );
};

export default MyPage;