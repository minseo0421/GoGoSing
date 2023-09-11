import React, { useState, useEffect } from "react";
import RecordSmall from "./RecordSmall.module.css";

const VoiceSmall: React.FC = () => {
  const [show, setShow] = useState(false);
  const [voice, setVoice] = useState(false);

  // 음역대 등록, 그 상태 저장이 생기면 toggleShow는 음역대 등록하는 페이지로 이동하는 걸로 수정
  const toggleShow = () => {
    setShow(!show);
  };

  const voiceShow = () => {
    setVoice(true);
  };

  useEffect(() => {
    console.log("Component updated with show:", show, " and voice:", voice);
  }, [show, voice]);

  return (
    <div className={RecordSmall.container}>
      {!show && !voice ? (
        <div>
          <p>목소리 등록하러 가기</p>
          <img
            className={RecordSmall.PitchIcon}
            onClick={toggleShow}
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
      {show && !voice ? (
        <button onClick={voiceShow}>목소리 등록했다 치기</button>
      ) : null}
    </div>
  );
};

export default VoiceSmall;
