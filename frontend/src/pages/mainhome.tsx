import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer/MainContainer";
import { setModal, setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import styles from './mainhome.module.css'
import axiosInstance from "../axiosinstance";

interface userdata { 
  socialType: string;
  nickname: string;
  gender: string;
  birth: string;
  profileImg: string | null;
    
}
const MainHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState<userdata|null>(null)
  useEffect(()=>{
    const AccessToken = localStorage.getItem('AccessToken')
    if (AccessToken) {
      axiosInstance({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/user/detail`,
        headers:{
          Authorization:`Bearer ${AccessToken}`
        }
      }).then(res=>{
        console.log('로딩성공')
        setLogin(res.data)
        const user_role = localStorage.getItem('user_role') 
        if (user_role) {
          dispatch(setModal('genreSelect'))
          localStorage.removeItem('user_role') 
        }
      }).catch(err=>{
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        localStorage.removeItem('user_role')
      })
    } else {
      setLogin(null)
    }
  },[dispatch])

  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch]);
  return (
    <div style={{height:'100%'}}>
      <div  className={styles.topbar}>
        <img src="assets/logo.png" alt="" style={{ width: "20%" }} />
        {isLogin ? 
        <img crossOrigin="anonymous" src={isLogin.profileImg!==null ? `${isLogin.profileImg}`:'assets/default_user.png'} alt="" style={{ width: "45px",height:'45px', borderRadius:'50%'}} onClick={()=>navigate('/mypage')} />: 
        <Link style={{ color: "white" }} to="/login">Login</Link>
        }
      </div>
      <div style={{height:'90%'}}>
        <MainContainer/>
      </div>
    </div>
  );
};
export default MainHome;
