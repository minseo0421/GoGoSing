import React,{useEffect} from "react";
import styles from './mypage.module.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setModal } from "../../store/actions";
import { AppState } from "../../store/state";

const MyPage: React.FC = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector((state: AppState) => state.isLogin);
    const navigate = useNavigate()
    const logout = () => {
        const AccessToken = localStorage.getItem('AccessToken')
        axiosInstance({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/user/logout`,
            headers:{
                Authorization: 'Bearer ' + AccessToken,
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        dispatch(setLogin(null))
        navigate('/')
    }
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
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',padding:'5% 10% 10% 10%',}}>
                <img crossOrigin="anonymous" src={isLogin!.profileImg!==null ? `${isLogin!.profileImg}`:'assets/default_user.png'} alt="" style={{ width: "30%", borderRadius:'50%'}} onClick={()=>navigate('/mypage')} /> 
                <div className={styles.info}>
                    <p style={{display:'flex',justifyContent:'start',alignItems:'center',textAlign:'center'}}>
                        <img src={isLogin!.socialType==='KAKAO' ? "assets/kakao_logo.png":
                    isLogin!.socialType==='GOOGLE' ? "assets/google_logo.png" :
                    isLogin!.socialType==='NAVER' ? "assets/kakao_logo.png":''} style={{borderRadius:'50%', width:'25px', marginRight:'10px'}} alt="" />
                        <span style={{fontSize:'25px', fontWeight:'bold', marginRight:'10px'}}>{isLogin?.nickname} 님</span> 
                    </p>
                    <p style={{fontSize:'16px', margin:0,}}>성　　별 : {isLogin!.gender==='MALE' ? '남자':'여자'}</p>
                    <p style={{fontSize:'16px',marginTop:0,}}>생년월일 : {isLogin!.birth}</p>
                </div>
            </div>
            <div style={{justifyContent:'space-around',display:'flex', width:'100%', padding:'0 5% 10% 5%',boxSizing:'border-box'}}>
                <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'red'}}>회원정보 수정</button>
                <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'green'}}
                onClick={()=>logout}>로그아웃</button>
            </div>
        </div>
        <div style={{display:'flex', width:'90%', justifyContent:'space-between', padding:'0 5%', alignItems:'center'}}>
            <h2>내가 좋아하는 장르</h2>
            <p onClick={()=>dispatch(setModal('genreSelect'))}>수정하기</p>
        </div>
        <div style={{flexDirection:'row',width:'90%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 5%'}}>
            <img src="assets/genre_img.png" alt="" />
            <img src="assets/genre_img.png" alt="" />
            <div style={{borderRadius:'50%',width:80,height:80,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}
             onClick={()=>dispatch(setModal('genreSelect'))}>
                <img src="assets/plus_icon.png" alt="" />
                <span style={{color:'#C0CEFF'}}>추가하기</span>
            </div>
        </div>
        <hr style={{marginTop:20, width:'90%', border:'white 1px solid'}} />
        <div style={{display:'flex', width:'90%', justifyContent:'space-between', padding:'0 5%', alignItems:'center'}}>
            <h2>나의 음역대, 음색 데이터 관리</h2>
        </div>
        <div style={{flexDirection:'row',width:'90%', display:'flex', justifyContent:'space-around', alignItems:'center', padding:'0 5%'}}>
            <div style={{borderRadius:10,width:'48%',height:120,backgroundColor:'rgba(217,217,217,0.2)',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
                <span style={{color:'#C0CEFF',fontSize:12}}>{isLogin?.nickname}님의</span>
                <span style={{color:'#C0CEFF',fontSize:12}}>음역대는 레3 ~ 도4 입니다.</span>
                <span style={{color:'white', marginTop:10}}>음역대 수정하기 →</span>
            </div>
            <div style={{borderRadius:10,width:'48%',height:120,backgroundColor:'rgba(217,217,217,0.2)',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}
            onClick={()=>alert('클릭')}>
                <span style={{color:'#C0CEFF',fontSize:12}}>{isLogin?.nickname}님의 음색</span>
                <span style={{color:'#C0CEFF',fontSize:12}}>{isLogin?.nickname}이 부른 노래.mp3</span>
                <span style={{color:'white', marginTop:10}}>목소리 수정하기 →</span>
            </div>
        </div>
        <hr style={{marginTop:20, width:'90%', border:'white 1px solid', marginBottom:0}} />
        <div style={{justifyContent:'right',display:'flex',marginRight:'5vw'}}>
            <p style={{color:'red',fontWeight:'bold',fontSize:'16px'}}>회원탈퇴</p>
        </div>
    </div>

  );
};

export default MyPage;