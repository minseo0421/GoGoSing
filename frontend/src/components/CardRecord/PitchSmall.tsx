import React, { useState, useEffect } from "react";
import RecordSmall from "./RecordSmall.module.css";
import { useNavigate } from "react-router-dom";

const PitchSmall: React.FC = () => {
  const [show, setShow] = useState(false);
  const [pitch, setPitch] = useState(false);

  const navigate = useNavigate();

  const musicrecord = () => {
    navigate("/record");
  };

  // 음역대 등록, 그 상태 저장이 생기면 toggleShow는 음역대 등록하는 페이지로 이동하는 걸로 수정
  const toggleShow = () => {
    console.log("toggleShow is triggered");
    setShow(!show);
  };

  const pitchShow = () => {
    console.log("pitchShow is triggered");
    setPitch(true);
    // setShow(false);
  };

  useEffect(() => {
    console.log("Component updated with show:", show, " and pitch:", pitch);
  }, [show, pitch]);

  return (
    <div className={RecordSmall.container}>
      {!show && !pitch ? (
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
        <img
          className={RecordSmall.PitchIcon}
          onClick={toggleShow}
          src="assets/addButton.svg"
          alt=""
        />
      )}
      {show && !pitch ? (
        <button onClick={pitchShow}>음역대 등록했다 치기</button>
      ) : null}
    </div>
  );
};

export default PitchSmall;
