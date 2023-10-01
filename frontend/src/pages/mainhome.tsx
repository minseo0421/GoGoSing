import React, { useEffect } from "react";
import MainContainer from "../components/MainContainer/MainContainer";
import { setLogin, setModal, setPage } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import styles from './mainhome.module.css'
import { AppState } from "../store/state";
import axiosInstance from "../axiosinstance";

const MainHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: AppState) => state.isLogin);

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
        dispatch(setLogin(res.data))
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
      dispatch(setLogin(null))
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
        <img crossOrigin="anonymous" src={isLogin.profileImg!==null ? `${isLogin.profileImg}`:'assets/default_user.png'} alt="" style={{ width: "15%", borderRadius:'50%'}} onClick={()=>navigate('/mypage')} />: 
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
