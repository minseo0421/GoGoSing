import React, { useState, useEffect } from "react";
import RecordLong from "./RecordLong.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const VoiceLong: React.FC = () => {
  const [pitchData, setPitchData] = useState<any[]|null>(null);
  const navigate = useNavigate();

  const musicupload = () => {
    if (localStorage.getItem("AccessToken")) {
      navigate("/musicupload");
    } else {
      alert('로그인 후 이용가능합니다.')
      navigate('/login')
    }
  };

  const getPitchList = () => {
    axiosInstance({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/analyze/waveMusicList`, 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      }).then(res=>{
        setPitchData(res.data);
      }).catch(err=>{
        console.log(err)
      })
    }

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      getPitchList();
    }
  }, []);

  return (
    <div>
      {pitchData===null ? 
        <div className={RecordLong.container}>
            <p>등록된 목소리가 없으세요 !</p>
            <img
              className={RecordLong.PitchIcon}
              onClick={musicupload}
              src="assets/addButton.svg"
              alt=""
            />
            <p onClick={musicupload}>등록하러 가기</p>
      </div>
       : pitchData.length===0 ? 
        <div className={RecordLong.container}>
          <p>다른 목소리를 등록해주세요!</p>
            <img
              className={RecordLong.PitchIcon}
              onClick={musicupload}
              src="assets/addButton.svg"
              alt=""
            />
          <p onClick={musicupload}>등록하러 가기</p>
        </div>
         : <CardSmallContainer albums={pitchData} />}
    </div>
  );
};

export default VoiceLong;
