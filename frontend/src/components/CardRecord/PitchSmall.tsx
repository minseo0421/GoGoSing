import React, { useState, useEffect } from "react";
import RecordSmall from "./RecordSmall.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const PitchSmall: React.FC = () => {
  const [pitchData, setPitchData] = useState<any[]>([]);
  const navigate = useNavigate();

  const getPitchList = () => {
    axiosInstance({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/analyze/rangeMusicList`, 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }).then(res=>{
      setPitchData(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  const musicrecord = () => {
    navigate("/record");
  };
  useEffect(()=>{
    getPitchList()
  },[])
  return (
    <div className={RecordSmall.container}>
      {!pitchData ? (
        <div>
          <p>음역대 등록하러 가기</p>
          <img
            className={RecordSmall.PitchIcon}
            onClick={musicrecord}
            src="assets/addButton.svg"
            alt=""
          />
        </div>
      ) : (
        <div onClick={musicrecord}>
          <p>음역대 정보</p>
          <p style={{color:'#C0CEFF',fontSize:12, margin:0}}>nickname 님의</p>
          <p style={{color:'#C0CEFF',fontSize:12, margin:0}}>음역대는 레3 ~ 도4 입니다.</p>
          <p style={{color:'white', marginTop:10}}>음역대 수정하기 →</p>
        </div>
      )}
    </div>
  );
};

export default PitchSmall;
