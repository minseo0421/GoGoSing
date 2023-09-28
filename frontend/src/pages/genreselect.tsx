import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/actions";
import { AppState } from "../store/state";
import styles from './account/genresurvey.module.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const Background = styled.div<{ $imageUrl: string }>`
  opacity: 1;
  position: fixed;
  width:100%;
  height:100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.$imageUrl});
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  color: white;
  text-align: right;
  z-index: 9999;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  top: 40px;
  right: 20px;
`;

const ModalContainer = styled.div<{ open: boolean }>`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${(props) => (props.open ? slideUp : slideDown)} 0.3s forwards;
`;

const GenreSelect: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen === "genreSelect");
  const [defaultsel, setdefaultsel] = useState<number[]>([])
  const [selgenres, setSelGenres] = useState<number[]>([])
  const navigate = useNavigate();

  useEffect(()=>{
    axios({
      method:'get',
      url:'',
      headers:{
        Authorization:''
      }
    }).then(res=>{
      setSelGenres(res.data)
      setdefaultsel(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const genreSel = (sel:number) => {
    if (selgenres.includes(sel)) {
      // 이미 선택된 genre라면 제거
      setSelGenres(selgenres.filter((item) => item !== sel));
    } else {
      if (selgenres.length >= 3)
      {alert('배불렁')}
      // 선택되지 않은 genre라면 추가
      else {
        setSelGenres([...selgenres, sel]);
      }
    }
  }
  const submit = () => {
    axios({
      method:'post',
      url:'',
      headers:{
        Authorization:''
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    navigate('/')
  }
  // Render the modal
  if (!isModalOpen) {
    return null;
  }

  return (
      <Background $imageUrl="../../assets/background.png">
        <CloseButton onClick={() => dispatch(setModal(null))}>
          닫기
        </CloseButton>
        <ModalContainer open={isModalOpen}>
          <div className={styles.container}>
            <div style={{marginTop:'20%', textAlign:'start',marginLeft:'0%'}}>
              <h1 style={{marginBottom:0}}>좋아하는 장르를 <br /> 선택해주세요!</h1>
              <p style={{marginTop:0}}>(최대 3개까지 선택할 수 있어요)</p>
            </div>
            <div className={styles.genrelist}>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'5% 0',boxSizing:'border-box'}}>
                <div onClick={()=>{genreSel(1)}} className={`${styles.genre} ${selgenres.includes(1) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  발라드
                </div>
                <div onClick={()=>{genreSel(2)}} className={`${styles.genre} ${selgenres.includes(2) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  댄스
                </div>
                <div onClick={()=>{genreSel(3)}} className={`${styles.genre} ${selgenres.includes(3) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  POP
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'5% 0',boxSizing:'border-box'}}>
                <div onClick={()=>{genreSel(4)}} className={`${styles.genre} ${selgenres.includes(4) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  랩/힙합
                </div>
                <div onClick={()=>{genreSel(5)}} className={`${styles.genre} ${selgenres.includes(5) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  R&B/Soul
                </div>
                <div onClick={()=>{genreSel(6)}} className={`${styles.genre} ${selgenres.includes(6) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  인디음악
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'5% 0',boxSizing:'border-box'}}>
                <div onClick={()=>{genreSel(7)}} className={`${styles.genre} ${selgenres.includes(7) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  록/메탈
                </div>
                <div onClick={()=>{genreSel(8)}} className={`${styles.genre} ${selgenres.includes(8) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  포크/블루스
                </div>
                <div onClick={()=>{genreSel(9)}} className={`${styles.genre} ${selgenres.includes(9) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  OST
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'5% 0',boxSizing:'border-box'}}>
                <div onClick={()=>{genreSel(10)}} className={`${styles.genre} ${selgenres.includes(10) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  트로트
                </div>
                <div onClick={()=>{genreSel(11)}} className={`${styles.genre} ${selgenres.includes(11) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  동요
                </div>
                <div onClick={()=>{genreSel(12)}} className={`${styles.genre} ${selgenres.includes(12) ? styles.sel_genre : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  CCM
                </div>
              </div>
            </div>
            {defaultsel === selgenres ? <button className={styles.btn} onClick={()=>navigate('/')}>다음에..</button> 
            : <button className={styles.btn} onClick={submit}>적용하기</button> }
        </div>
        </ModalContainer>
      </Background>
  );
};

export default GenreSelect;
