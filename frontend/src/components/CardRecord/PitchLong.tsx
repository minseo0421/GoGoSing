import React from "react";
import RecordLong from "./RecordLong.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import { useNavigate } from "react-router-dom";


interface props {
  pitchData:any[]|null
}
const PitchLong: React.FC<props> = ({pitchData}) => {
  const navigate = useNavigate();

  const musicrecord = () => {
    if (localStorage.getItem("AccessToken")) {
      navigate("/record");
    } else {
      alert('로그인 후 이용가능합니다.')
      navigate('/login')
    }
  };

  

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
