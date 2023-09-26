import React, { useEffect } from "react";
import MainContainer from "../components/MainContainer/MainContainer";
import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import styles from './mainhome.module.css'

const MainHome: React.FC = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch]);
  return (
    <div style={{height:'85vh'}}>
      <div  className={styles.topbar}>
        <img src="assets/logo.png" alt="" style={{ width: "20%" }} />
        {/* {usertoken ?  */}
        {/* <Link style={{ color: "white" }} to="/mypage"><img src="assets/default_user.png" alt="" style={{ width: "80%"}} /></Link>:  */}
        <Link style={{ color: "white" }} to="/login">Login</Link>
        {/* } */}
      </div>
      <MainContainer/>
    </div>
  );
};
export default MainHome;
