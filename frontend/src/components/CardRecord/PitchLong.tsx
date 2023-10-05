import React, { useState, useEffect } from "react";
import RecordLong from "./RecordLong.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const PitchLong: React.FC = () => {
  const [pitchData, setPitchData] = useState<any[]|null>(null);
  const navigate = useNavigate();

  const musicrecord = () => {
    if (localStorage.getItem("AccessToken")) {
      navigate("/record");
    } else {
      alert('로그인 후 이용가능합니다.')
      navigate('/login')
    }
  };

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
            <p>등록된 음역대가 없습니다 !</p>
            <img
              className={RecordLong.PitchIcon}
              onClick={musicrecord}
              src="assets/addButton.svg"
              alt=""
            />
            <p onClick={musicrecord}>등록하러 가기</p>
          </div>
       : <CardSmallContainer albums={pitchData.slice(0,10)} />}

    </div>
  );
};

export default PitchLong;
