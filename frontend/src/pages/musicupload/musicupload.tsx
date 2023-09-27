import React, { useState } from 'react';
// import MusicPlay from '../components/musicrecord/musicplay';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosinstance';
import { AudioPlayer }  from '../../components/musicrecord/audioplay';

const MusicUpload: React.FC = () => {
    const navigate = useNavigate();
    // const Token = localStorage.getItem('accessToken');
    // if (!Token) {
    //   console.log('토큰없음')
      
    //   navigate('/pages/account/login');
    // }

    const [file, setFile] = useState<File | null>(null);

    
    const Home = () => {
        navigate("/");
    };

    const MymusicUpload = () => {
      if (file) {
        const formData = new FormData();
        formData.append('file', file); 
        console.log(formData)
        console.log(file)

        axiosInstance({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/music/analyze`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'accessToken': `Bearer ${localStorage.getItem("accessToken")}`
          },
        })
          .then((res) => {
            console.log(res);
            alert('업로드 완료!')
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('파일이 선택되지 않았습니다.');
      }
    };


      const removeAudio = () => {
        console.log(file)
        setFile(null)
      };
      const divStyle: React.CSSProperties = {
        // width: '100%',
        // height: '100%',
        background: 'rgba(217, 217, 217, 0.2)',
        borderRadius: '15px',
      };

      const buttonStyle: React.CSSProperties = {
        width: '40%', // 반응형 크기 조절
        height: '60%', // 높이를 자동으로 조절
        // left: '30%', // 가운데 정렬을 위한 좌표 조절
        // top: '50%', // 가운데 정렬을 위한 좌표 조절
        // transform: 'translate(-50%, -50%)', // 가운데 정렬
        background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',
        borderRadius: '50px',
        border: 'none', // Optional: Remove button border
        color: '#fff', // Optional: Text color
        cursor: 'pointer',
      };
    
    return (
        <>
        <p onClick={ Home }>X</p>
        <h1>자신이 부른 노래를</h1>
        <h1>업로드해 주세요!</h1>
        <br />
        <p>업로드 해주신 노래를 기반으로</p>
        <p>주토끼님의 목소리와</p>
        <p>유사한 노래를 추천합니다.</p>
          <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 30 }}>
            <div style={{ margin: 'auto', marginBottom: '10px' }}>
            
            {file===null && (
              <div style={divStyle}>
                <input
                  type="file"
                  accept="audio/*"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={({ target: { files } }) => files && files[0] && setFile(files[0])}
                />
                <img
                  src="assets/file.png"
                  alt=""
                  style={{ width: '30%', height: '30%', cursor: 'pointer' }}
                  onClick={() => document.getElementById('fileInput')?.click()}
                />
              </div>
            )}
            {file && (
              <div>
                <AudioPlayer audioSourceURL={window.URL.createObjectURL(file)} />
                <button onClick={removeAudio} style={buttonStyle}>재 업로드</button>
                <button onClick={MymusicUpload} style={buttonStyle}>업로드</button>
              </div>
            )}
            </div>
          </div>
        </>
      );
}
export default MusicUpload;