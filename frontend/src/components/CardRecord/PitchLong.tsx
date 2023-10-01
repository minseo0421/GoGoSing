import React, { useState, useEffect } from "react";
import RecordLong from "./RecordLong.module.css";
// import CardSmallContainer from "../CardSmall/CardSmallContainer";
import { useNavigate } from "react-router-dom";

const PitchLong: React.FC = () => {
  const [show, setShow] = useState(false);
  const [pitch, setPitch] = useState(false);

  const navigate = useNavigate();

  const musicrecord = () => {
    navigate("/record");
  };

  // 음역대 등록, 그 상태 저장이 생기면 toggleShow는 음역대 등록하는 페이지로 이동하는 걸로 수정
  // const toggleShow = () => {
  //   console.log("toggleShow is triggered");
  //   setShow(!show);
  // };

  const pitchShow = () => {
    console.log("pitchShow is triggered");
    setPitch(true);
    setShow(false);
  };

  useEffect(() => {
    console.log("Component updated with show:", show, " and pitch:", pitch);
  }, [show, pitch]);

  return (
    <div>
      {pitch ? (
        // <div>{pitch ? <CardSmallContainer /> : null}</div>
        <div>{pitch ? null : null}</div>
      ) : (
        <div className={RecordLong.container}>
          {!show && !pitch ? (
            <div>
              <p>등록된 음역대가 없으세요 !</p>
              <img
                className={RecordLong.PitchIcon}
                onClick={musicrecord}
                src="assets/addButton.svg"
                alt=""
              />
              <p>등록하러 가기</p>
            </div>
          ) : null}

          {show && !pitch ? (
            <button onClick={pitchShow}>음역대 등록했다 치기</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PitchLong;
