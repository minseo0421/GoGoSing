import React, { useEffect } from "react";
import MainContainer from "../components/MainContainer/MainContainer";
import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import styles from './mainhome.module.css'

const MainHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usertoken = localStorage.getItem('usertoken')
  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch]);
  return (
    <div style={{height:'88vh'}}>
      <div  className={styles.topbar}>
        <img src="assets/logo.png" alt="" style={{ width: "20%" }} />
        {usertoken ? 
        <img src="assets/default_user.png" alt="" style={{ width: "15%"}} onClick={()=>navigate('/mypage')} />: 
        <Link style={{ color: "white" }} to="/login">Login</Link>
        }
      </div>
      <MainContainer/>
    </div>
  );
};
export default MainHome;
