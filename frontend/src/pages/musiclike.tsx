import React, { useEffect } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import MainStyle from "../components/MainContainer/MainContainer.module.css";
import RecordStyle from "../components/CardRecord/RecordSmall.module.css";
import BarStyle from "./ContainerBar.module.css";
import PitchSmall from "../components/CardRecord/PitchSmall";
import VoiceSmall from "../components/CardRecord/VoiceSmall";
import CardLongContainer from "../components/CardLong/CardLongContainer";

const MusicLike: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(4));
  }, [dispatch]);

  // const navigate = useNavigate();

  // const musicrecord = () => {
  //   navigate("/record");
  // };

  return (
    <div>
      {/* <div className={MainStyle.container}> */}
      <div className={RecordStyle.largeContainer}>
        <PitchSmall></PitchSmall>
        <VoiceSmall></VoiceSmall>
      </div>
      <div>
        <div className={BarStyle.pitch}>❤️ 내가 좋아요 한 노래 !❤️</div>
        <CardLongContainer></CardLongContainer>
      </div>
    </div>
    // </div>
  );
};
export default MusicLike;
