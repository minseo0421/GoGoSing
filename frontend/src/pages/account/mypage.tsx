import React,{ useState, useEffect } from "react";
import styles from './mypage.module.css'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/actions";
import PitchSmall from "../../components/CardRecord/PitchSmall";
import VoiceSmall from "../../components/CardRecord/VoiceSmall";
import RecordStyle from "../../components/CardRecord/RecordSmall.module.css";

interface userdata { 
    socialType: string;
    nickname: string;
    gender: string;
    birth: string;
    profileImg: string | null;    
}

const MyPage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLogin, setLogin] = useState<userdata|null>(null)
    const [mygenre, setMygenre] = useState<number[]>([])
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
        navigate('/')
    }
    const myimgdelete = () =>{
        axiosInstance({
            method:'delete',
            url:`${process.env.REACT_APP_API_URL}/user/delete/profileImage`,
            headers:{
              Authorization:`Bearer ${localStorage.getItem("AccessToken")}`
            }
          }).then(res=>{
            Imgreload()
          }).catch(err=>{
          })
    }
    const Imgreload =()=>{
        axiosInstance({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/user/detail`,
            headers:{
              Authorization:`Bearer ${localStorage.getItem("AccessToken")}`
            }
          }).then(res=>{
            setLogin(res.data)
            console.log(res.data)
          }).catch(err=>{
            localStorage.removeItem('AccessToken')
            localStorage.removeItem('RefreshToken')
          })
    }
    useEffect(()=>{
        const AccessToken = localStorage.getItem('AccessToken')
        axiosInstance({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/user/detail`,
            headers:{
              Authorization:`Bearer ${AccessToken}`
            }
          }).then(res=>{
            setLogin(res.data)
          }).catch(err=>{
            localStorage.removeItem('AccessToken')
            localStorage.removeItem('RefreshToken')
          })

        axiosInstance({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/genre`,
            headers:{
                Authorization: 'Bearer ' + AccessToken,
            }
        }).then(res=>{
            setMygenre(res.data)
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
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',padding:'5% 10% 5% 10%',}}>
                <div style={{ width: "30%"}}>
                    <img crossOrigin="anonymous" src={isLogin?.profileImg!==null ? `${isLogin?.profileImg}`:'assets/default_user.png'} alt="" style={{ width: "90px", height:'90px', borderRadius:'50%'}} />
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={({ target: { files } }) => {
                        if (files && files[0]) {
                            const formData = new FormData();
                            formData.append('s3upload', files[0]); 
                            axiosInstance({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_URL}/user/update/profileImage`,
                            data: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'accessToken': `Bearer ${localStorage.getItem("AccessToken")}`
                            },
                            })
                            .then((res) => {
                                alert('업로드 완료!')
                                Imgreload()
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        }}}
                    />
                    {isLogin?.profileImg===`${process.env.REACT_APP_DEFAULT_IMG}` ? 
                    <div style={{display:'flex',justifyContent:'space-evenly', width:'90%', marginLeft:'5%'}}>
                        <button style={{borderRadius:10, border:'none',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.3)'}} onClick={() => document.getElementById('fileInput')?.click()}>등록</button> 
                    </div>     
                    :
                    <div style={{display:'flex',justifyContent:'space-evenly', width:'90%', marginLeft:'5%'}}>
                        <button style={{borderRadius:10, border:'none',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.3)'}} onClick={() => document.getElementById('fileInput')?.click()}>변경</button> 
                        <button style={{borderRadius:10, border:'none',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.3)'}} onClick={myimgdelete}>삭제</button>
                    </div>
                    }
                </div>
                <div className={styles.info}>
                    <p style={{display:'flex',justifyContent:'start',alignItems:'center',textAlign:'center'}}>
                        <img src={isLogin?.socialType==='KAKAO' ? "assets/kakao_logo.png": isLogin?.socialType==='GOOGLE' ? "assets/google_logo.png" : isLogin?.socialType==='NAVER' ? "assets/naver_logo.png":"assets/ggs_logo.png"} 
                            style={{borderRadius:'50%', width:'25px', marginRight:'10px',marginTop:'5px', boxShadow:'5px 5px 5px rgba(0, 0, 0, 0.2)'}} alt="" />
                        <span style={{fontSize:'25px', fontWeight:'bold', marginRight:'10px'}}>{isLogin?.nickname} 님</span>
                        <img src="assets/account_edit.png" alt="" onClick={()=>{alert('닉네임 변경')}} />
                    </p>
                    <p style={{fontSize:'16px', margin:0,}}>성　　별 : {isLogin?.gender==='MALE' ? '남자':'여자'}</p>
                    <p style={{fontSize:'16px',marginTop:0,}}>생년월일 : {isLogin?.birth}</p>
                </div>
            </div>
            <div style={{justifyContent:'space-around',display:'flex', width:'100%', padding:'0 5% 5% 5%',boxSizing:'border-box'}}>
                {isLogin?.socialType==='X' ? 
                <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'#7290FA', border:'none',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.1)'}} onClick={()=>{alert('비밀번호 변경')}}>비밀번호 변경</button>
                : <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'rgba(255, 255, 255, 0.7)', border:'none',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.3)'}} disabled>비밀번호 변경<br /><span style={{fontSize:'6px'}}>(소셜 회원입니다)</span></button>}
                <button style={{width:'40%',borderRadius:'2rem',height:'45px',backgroundColor:'#F27474', border:'none',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.3)'}}
                onClick={()=>logout()}>로그아웃</button>
            </div>
        </div>
        <div style={{width:'100%',height:'100%',overflow:'auto'}}>
            <div style={{display:'flex', width:'90%', justifyContent:'space-between', padding:'0 5%', alignItems:'center'}}>
                <h2>내가 좋아하는 장르</h2>
                <p onClick={()=>dispatch(setModal('genreSelect'))}>수정하기</p>
            </div>
            <div style={{flexDirection:'row',width:'90%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 5%'}}>
                {mygenre.length>=1 && <img src={`assets/genres/${mygenre[0]}.png`} alt=""  className={styles.genreimg} />}
                {mygenre.length>=2 && <img src={`assets/genres/${mygenre[1]}.png`} alt=""  className={styles.genreimg} />}
                {mygenre.length>=3 && <img src={`assets/genres/${mygenre[2]}.png`} alt=""  className={styles.genreimg} />}
                {mygenre.length<3 && 
                <div style={{borderRadius:'50%',width:80,height:80,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}
                onClick={()=>dispatch(setModal('genreSelect'))}>
                    <img src="assets/plus_icon.png" alt="" />
                    <span style={{color:'#C0CEFF'}}>추가하기</span>
                </div>}
                {mygenre.length<2 && 
                <div style={{borderRadius:'50%',width:80,height:80,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
                </div>}
            </div>
            <hr style={{marginTop:20, width:'90%', border:'white 1px solid'}} />
            <div style={{display:'flex', width:'90%', justifyContent:'space-between', padding:'0 5%', alignItems:'center'}}>
                <h2>나의 음역대, 음색 데이터 관리</h2>
            </div>
            <div className={RecordStyle.largeContainer}>
                <PitchSmall />
                <VoiceSmall />
                {/* <div style={{borderRadius:10,width:'48%',height:120,backgroundColor:'rgba(217,217,217,0.2)',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
                    <span style={{color:'#C0CEFF',fontSize:12}}>{isLogin?.nickname}님의</span>
                    <span style={{color:'#C0CEFF',fontSize:12}}>음역대는 레3 ~ 도4 입니다.</span>
                    <span style={{color:'white', marginTop:10}}>음역대 수정하기 →</span>
                </div>
                <div style={{borderRadius:10,width:'48%',height:120,backgroundColor:'rgba(217,217,217,0.2)',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}
                onClick={()=>alert('클릭')}>
                    <span style={{color:'#C0CEFF',fontSize:12}}>{isLogin?.nickname}님의 음색</span>
                    <span style={{color:'#C0CEFF',fontSize:12}}>{isLogin?.nickname}이 부른 노래.mp3</span>
                    <span style={{color:'white', marginTop:10}}>목소리 수정하기 →</span>
                </div> */}
            </div>
            <hr style={{marginTop:20, width:'90%', border:'white 1px solid', marginBottom:0}} />
            <div style={{justifyContent:'right',display:'flex',marginRight:'5vw'}}>
                <p style={{color:'red',fontWeight:'bold',fontSize:'16px'}} onClick={()=>{alert('회원탈퇴')}}>회원탈퇴</p>
            </div>
        </div>
    </div>

  );
};

export default MyPage;