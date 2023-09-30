import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosinstance';

const UploadResult: React.FC = () => {
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태를 관리
  const [resultData, setResultData] = useState<any>(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/music/analyze/voiceFile`,
        headers: {
          'accessToken': `Bearer ${localStorage.getItem("AccessToken")}`
        },
      });
      console.log(response);
      console.log(response.data);
      setFileLink(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const myMusic = useCallback(async () => {
    console.log(fileLink)
    try {
      if (fileLink) {
        const requestData = {
          voiceFile: fileLink, // API 문서에서 주어진 필드에 파일 링크를 넣어줍니다.
        };

        const response = await axiosInstance({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/music/analyze/voice`,
          data: requestData,
          headers: {
            'Content-Type': 'application/json',
            'accessToken': `Bearer ${localStorage.getItem("AccessToken")}`
          },
        });

        console.log(response);
        alert('분석 완료!');
        setResultData(response.data);
        setIsLoading(false); // 데이터 로딩이 완료되면 isLoading을 false로 변경
      } else {
        console.log('파일이 선택되지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
      // setIsLoading(false); // 에러가 발생해도 isLoading을 false로 변경
    }
  }, [fileLink]); // fileLink을 의존성 배열에 추가

  const home = () => {
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);
  
  useEffect(() => {
    if (fileLink) {
      myMusic();
    }
  }, [fileLink, myMusic]);

  // 데이터 로딩 중인 경우 로딩 화면을 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 데이터 로딩이 완료된 경우 결과 화면을 표시
  return (
    <>
      <h1>분석 결과</h1>
      <div>
        <h1>당신이 부른 노래와 맞는 노래는</h1>
        {resultData && resultData.length > 0 && (
          <div>
            <p>Singer: {resultData[0].singer}</p>
            <p>Title: {resultData[0].title}</p>
            <img src={resultData[0].songImg} alt={resultData[0].title} />
          </div>
        )}
      </div>
      <button onClick={home} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>Go home</button>
    </>
  );
}

export default UploadResult;