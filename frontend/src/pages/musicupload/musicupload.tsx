import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosinstance';
import { AudioPlayer }  from '../../components/musicrecord/audioplay';
import { setModal, setAlbum } from "../../store/actions";
import { useDispatch } from "react-redux";

const MusicUpload: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<any | null>(null);
    const [imgErr, setImgErr] = useState<boolean>(false)
    const dispatch = useDispatch();
    const handleAlbumClick = () => {
        dispatch(setModal("musicDetail"));
        dispatch(setAlbum(responseData.musicId)) // 모달 표시 액션
      };

    
    const Home = () => {
        navigate(-1); // 뒤로가기
    };

    const MymusicUpload = () => {
      const Token = localStorage.getItem('AccessToken');
      if (!Token) {
        alert('회원이 아닙니다.')
        console.log('회원이 아닙니다.')
        
        return navigate('/login');
      }
      setLoading(true);
      if (file) {
        const formData = new FormData();
        formData.append('file', file); 
        console.log(formData)
        console.log(file)

        axiosInstance({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/analyze/waveResult`,
          data: formData,
          headers: {
            "Content-Type":'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
          },
        })
          .then((res) => {
            console.log(res);
            setResponseData(res.data);
            setLoading(false)
            alert('업로드 완료!')
            // navigate("/uploadresult");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        console.log('파일이 선택되지 않았습니다.');
        setLoading(false);
      }
    };


      const removeAudio = () => {
        setFile(null)
        console.log(file)
        // window.location.reload();
      };
      const divStyle: React.CSSProperties = {
        // width: '100%',
        // height: '100%',
        margin:'0 50px',
        padding:'30px 0',
        background: 'rgba(217, 217, 217, 0.2)',
        borderRadius: '15px',
      };

    return (
        <>
         {loading ? (
                // 로딩 중인 경우 로딩 화면을 표시
                <div style={{ marginTop: '150px' }}>
                  <h2>노래 분석 중입니다.</h2>
                  <h3>Loading...</h3>
                  <img src="assets/spinner.gif" alt="" style={{ width: '50%'}} />
                </div>
            ) : responseData ? (
                // 응답 데이터가 있는 경우 데이터를 표시
                <div style={{marginTop:'35%'}}>
                  <h2>당신의 음색과</h2>
                  <h2>가장 잘 맞는 노래입니다.</h2>
                    {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" style={{ width: '60%' }} />
                    :<img src={responseData.songImg} alt={responseData.title} onClick={handleAlbumClick} crossOrigin="anonymous" onError={()=>setImgErr(true)}/>}
                    <h2>{responseData.title}</h2>
                    <h3>{responseData.singer}</h3>
                    <p>노래방 번호: {responseData.musicId}</p>
                    <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff', margin:'auto',height:'30px',display:'flex',justifyContent:'center',alignItems:'center',width:'35%'}} 
                      onClick={Home}>Go home</p>
                </div>
            ) : (
              <div style={{marginTop:'20%'}}>
              {/* <p onClick={ Home }>X</p> */}
              <h1>노래 업로드</h1>
              <p>업로드 해주신 노래를 기반으로 <br /> 사용자님께 어울리는 노래를 추천합니다.</p>
              <br />
           
                <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginTop: '25%' }}>
                  <div style={{ margin: 'auto', marginBottom: '10px' }}>
                  
                  {file===null && (
                    <div>
                      <input
                        type="file"
                        accept="audio/*"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={({ target: { files } }) => files && files[0] && setFile(files[0])}
                      />
                      <div style={divStyle} onClick={() => document.getElementById('fileInput')?.click()}>

                      <img
                        src="assets/file.png"
                        alt=""
                        style={{ width: '50%', height: '50%', cursor: 'pointer' }}
                        />
                      </div>
                      <p>사용자님이 부르신 노래 파일을<br />업로드 해주세요!</p>
                      <br />
                      <p>(...노래 파일이 없으신 경우...)<br /><br />
                       GOGO SING 에서 노래를 부르신 후<br /> 즉시, 업로드 하실 수 있습니다.</p>
                    </div>
                  )}
                  {file && (
                    <div>
                      <AudioPlayer audioSourceURL={window.URL.createObjectURL(file)} />
                      <div style={{display:'flex', marginTop:'10%'}}>
                        <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff',height:'30px',width:'120px',display:'flex',justifyContent:'center',alignItems:'center',margin:'5px'}} 
                        onClick={removeAudio}>다시 선택하기</p>
                        <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff',height:'30px',width:'120px',display:'flex',justifyContent:'center',alignItems:'center',margin:'5px'}} 
                        onClick={MymusicUpload}>분석 진행하기</p>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
          )}
        </>
      );
}
export default MusicUpload;