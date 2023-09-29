import React, { useEffect, useState } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import styles from "./musicsearch.module.css";
import axiosInstance from "../axiosinstance";
import { useNavigate } from "react-router-dom";

const MusicSearch: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setPage(3));
  }, [dispatch]);

  const search = () => {
    const token = localStorage.getItem('AccessToken')
    if (!token) {
      alert('회원이 아닙니다.')
      return navigate('/login')}

    axiosInstance({
      method:'post',
      url:`${process.env.REACT_APP_API_URL}/~~~`,
      data:{keyword:keyword},
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div style={{height:'100%', width:'100%'}}>
      <div className={styles.topbar}>
        <span style={{fontSize:'20px',marginBottom:'5px'}}>검색</span>
        <span style={{display:'flex', width:'100%',justifyContent:'center'}}>
          <input type="text" style={{width:'80%', borderRadius:10, border:'none', padding:'3px 35px 3px 10px', background:'rgba(245, 246, 246, 0.4)', boxSizing:'border-box'}} placeholder="검색어를 입력해주세요." 
          value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} onKeyDown={(e)=>{if(e.key==='Enter') {search()}}} />
          <img style={{marginLeft:'-30px'}} src="assets/search_icon.png" alt="" onClick={()=>search()} />
        </span>
      </div>
      <div style={{ height: "90%", overflow: "auto" }}>
        {/* 여기가 메인 영역 */}
        <p>검색결과 출력하기</p>
       
      </div>
    </div>
  );
};
export default MusicSearch;
