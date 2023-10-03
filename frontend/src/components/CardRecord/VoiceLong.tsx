import React, { useState, useEffect } from "react";
import RecordLong from "./RecordLong.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";

const VoiceLong: React.FC = () => {
  const [show, setShow] = useState(false);
  const [pitch, setPitch] = useState(false);
  const [pitchData, setPitchData] = useState<any[]>([]);

  const navigate = useNavigate();

  const musicupload = () => {
    navigate("/musicupload");
  };

  const getPitchList = async () => {
    try {
      const res = await axiosInstance({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/analyze/waveMusicList`,
        headers: {
          accessToken: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      });
      console.log(res);
      console.log(res.data);
      setPitchData(res.data);
      setPitch(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      getPitchList();
    }
  }, []);

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
        <div>{pitch ? <CardSmallContainer albums={pitchData} /> : null}</div>
      ) : (
        // <div>{pitch ? null : null}</div>
        <div className={RecordLong.container}>
          {!show && !pitch ? (
            <div>
              <p>등록된 목소리가 없으세요 !</p>
              <img
                className={RecordLong.PitchIcon}
                onClick={musicupload}
                src="assets/addButton.svg"
                alt=""
              />
              <p>등록하러 가기</p>
            </div>
          ) : null}

          {show && !pitch ? (
            <button onClick={pitchShow}>목소리 등록했다 치기</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default VoiceLong;
