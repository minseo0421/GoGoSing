import React, { useState, useEffect } from "react";
import RecordSmall from "./RecordSmall.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const VoiceSmall: React.FC = () => {
  const [voice, setVoice] = useState<{nickname:string;voiceFileName:string;}|null>(null);
  const navigate = useNavigate();

  const musicupload = () => {
    navigate("/musicupload");
  };

  useEffect(() => {
    axiosInstance({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/user/detail/voiceFile`, 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }).then(res=>{
      setVoice(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }, []);

  return (
    <div className={RecordSmall.container}>
      {!voice ? (
        <div>
          <p>목소리 등록하러 가기</p>
          <img
            className={RecordSmall.PitchIcon}
            src="assets/addButton.svg"
            onClick={musicupload}
            alt=""
          />
        </div>
      ) : (
        <div>
          <p>목소리 정보</p>
          <p style={{color:'#C0CEFF',fontSize:12,margin:0}}>{voice.nickname}님이 등록한 노래</p>
          <p style={{color:'#C0CEFF',fontSize:12,margin:0}}>{voice.voiceFileName}</p>
          <p style={{color:'white', marginTop:10}} onClick={musicupload}>목소리 수정하기 →</p>
        </div>
      )}
    </div>
  );
};

export default VoiceSmall;
