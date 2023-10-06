import React, { useState, useEffect } from "react";
import RecordSmall from "./RecordSmall.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const PitchSmall: React.FC = () => {
  const [pitchData, setPitchData] = useState<{nickname:string;voiceRangeHighest:string;voiceRangeLowest:string}|null>(null);
  const navigate = useNavigate();
  const musicrecord = () => {
    navigate("/record");
  };
  useEffect(()=>{
    axiosInstance({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/user/detail/voiceRange`, 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }).then(res=>{
      setPitchData(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const removeDecimal = (value: string) => {
    return value.replace(/\.0$/, ''); // .0로 끝나는 부분을 빈 문자열로 대체
  };


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
          <p style={{color:'#C0CEFF',fontSize:12, margin:0}}>{pitchData.nickname} 님의</p>
          <p style={{color:'#C0CEFF',fontSize:12, margin:0}}>음역대는 {removeDecimal(pitchData.voiceRangeLowest)} ~ {removeDecimal(pitchData.voiceRangeHighest)} 입니다.</p>
          <p style={{color:'white', marginTop:10}}>음역대 수정하기 →</p>
        </div>
      )}
    </div>
  );
};

export default PitchSmall;
