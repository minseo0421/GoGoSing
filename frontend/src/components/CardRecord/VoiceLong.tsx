import React from "react";
import RecordLong from "./RecordLong.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import { useNavigate } from "react-router-dom";


interface props {
  voiceData:any[]|null
}

const VoiceLong: React.FC<props> = ({voiceData}) => {
  const navigate = useNavigate();

  const musicupload = () => {
    if (localStorage.getItem("AccessToken")) {
      navigate("/musicupload");
    } else {
      alert('로그인 후 이용가능합니다.')
      navigate('/login')
    }
  };


  return (
    <div>
      {voiceData===null ? 
        <div className={RecordLong.container}>
            <p>등록된 목소리가 없습니다 !</p>
            <img
              className={RecordLong.PitchIcon}
              onClick={musicupload}
              src="assets/addButton.svg"
              alt=""
            />
            <p onClick={musicupload}>등록하러 가기</p>
      </div>
       : voiceData.length===0 ? 
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
         : <CardSmallContainer albums={voiceData.slice(0,10)} />}
    </div>
  );
};

export default VoiceLong;
