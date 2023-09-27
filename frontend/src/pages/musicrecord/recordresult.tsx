import React from 'react';
// import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import MusicPlay from '../components/musicrecord/musicplay';

const RecordResult: React.FC = () => {

    
    // const [audioSourceURL, setAudioSourceURL] = React.useState("");

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    };

    // const RecordResult = () => await 

    return (
        <>
          <h1>분석 결과</h1>
          <button onClick={home} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>Go home</button>
        </>
      );
}
export default RecordResult;