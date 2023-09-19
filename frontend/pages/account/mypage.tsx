import React,{useState,useEffect} from "react";
import styled from './account.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    const genres=[1,2,3]
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
            <div style={{display:'flex', justifyContent:'end'}}>
                <img src="assets/X.png" alt="" style={{margin:'15px', cursor:'pointer'}} onClick={()=>{navigate('/')}}/>
            </div>
            <div className={styled.myinfo}>
                <div className={styled.imgcontainer}>
                    <img className={styled.myimg} src="assets/default_user.png" alt="" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    {isHovered && <div className={styled.imghover} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >프로필 변경</div>}
                </div>
                <div className={styled.info}>
                    <div style={{fontSize:'25px', fontWeight:'bold', display:'flex', alignItems:'center'}}>
                        <img src="assets/kakao_logo.png" style={{borderRadius:'50%',marginRight:'5px'}} alt="" /> 
                        <span> 주토끼 님</span>
                        <img src="assets/account_edit.png" alt="" style={{cursor:'pointer'}} onClick={()=>{alert('회원정보수정')}}/>
                    </div>
                    <p style={{fontSize:'20px'}}>성　　별 : 남자</p>
                    <p style={{fontSize:'20px'}}>생년월일 : 1995.11.14</p>
                </div>
            </div>
            <div className={styled.mybtn}>
                <button className={styled.btn1} onClick={()=>{alert('비밀번호 변경')}}>비밀번호 변경</button>
                <button className={styled.btn2} onClick={()=>{alert('로그아웃')}}>로그아웃</button>
            </div>
        </div>
        <div className={styled.list}>
            <h2 style={{margin:'0'}}>내가 좋아하는 장르</h2>
            <p style={{cursor:'pointer'}} onClick={()=>{alert('장르수정하기')}}>수정하기</p>
        </div>
        <div className={styled.genrelist}>
            {genres.map(genre => {
                return (
                <div className={styled.genre}>
                {genre}
                </div>
            )})}
        </div>
        <hr style={{width:'90%',border:'1px #6C73FC solid'}}/>
        <div className={styled.list}>
            <h2 style={{margin:'0'}}>나의 음역대, 음색 데이터 관리</h2>
            <p>　</p>
        </div>
        <div className={styled.list}>
            <div className={styled.databox}> 
                <p>주토끼님의 음역대는<br />레3 ~ 도4 입니다.</p> 
                <p style={{cursor:'pointer', fontWeight:'bold'}} onClick={()=>{alert('음역대 수정하기입니다')}}>음역대 수정하기 →</p> 
            </div>
            <div className={styled.databox}> 
                <p>나의 음색<br />주토끼 울음소리.mp3</p> 
                <p style={{cursor:'pointer', fontWeight:'bold'}} onClick={()=>{alert('목소리 수정하기입니다')}}>목소리 수정하기 →</p> 
            </div>
        </div>
        <p className={styled.resign} style={{cursor:'pointer'}} onClick={()=>{alert('회원탈퇴입니다')}}>회원탈퇴</p>
   </div>
  );
};

export default MyPage;