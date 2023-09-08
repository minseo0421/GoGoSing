import React, { useEffect } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const MusicLike: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(4));
  }, [dispatch]);

  const navigate = useNavigate()

  const musicrecord = () => {
    navigate('/record')
  }

  return (
    <div>
      <h1>MusicLike 입니당</h1>
      <button  onClick={musicrecord}>
            <span style={{marginLeft:'20px'}}> 녹음 하러 가기</span>
      </button>
      
    </div>
  );
};
export default MusicLike;
