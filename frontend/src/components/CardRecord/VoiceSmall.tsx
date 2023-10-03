import React, { useState, useEffect } from "react";
import RecordSmall from "./RecordSmall.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const VoiceSmall: React.FC = () => {
  const [voice, setVoice] = useState<any[]>([]);

  const navigate = useNavigate();

  const musicupload = () => {
    navigate("/musicupload");
  };
  const getVoiceList = () => {
    axiosInstance({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/analyze/waveMusicList`, 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }).then(res=>{
      setVoice(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(() => {
    getVoiceList()
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
          <p style={{color:'#C0CEFF',fontSize:12,margin:0}}>nickname님의 음색(수정필요)</p>
          <p style={{color:'#C0CEFF',fontSize:12,margin:0}}>IU - 겨울잠.wav</p>
          <p style={{color:'white', marginTop:10}} onClick={musicupload}>목소리 수정하기 →</p>
        </div>
      )}
    </div>
  );
};

export default VoiceSmall;
