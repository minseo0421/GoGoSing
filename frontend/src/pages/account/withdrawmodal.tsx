import React, {useState} from "react";
import styles from './withdrawmodal.module.css'
import axiosInstance from "../../axiosinstance";

interface Props {
    closemodal: ()=>void;
    logout:()=>void;
    isLogin: { 
      socialType: string;
      nickname: string;
      gender: string;
      birth: string;
      profileImg: string | null;    
  }
}
const WithDraw: React.FC<Props> = ({closemodal,logout,isLogin}) => {
  const [password, setPassword] = useState('')
  const withdraw = () => {
    if (password==='') {
      alert('비밀번호를 입력해주세요.')
      return
    }
    axiosInstance({
      method:'post',
      url: `${process.env.REACT_APP_API_URL}/user/quit`,
      data:{
        socialType:isLogin.socialType ==='X' ? false: true,
        checkPassword:password
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }).then(res => {
      console.log(res)
      alert('회원탈퇴가 완료되었습니다.')
      logout()
    }).catch(err=>{
      alert('비밀번호를 확인해주세요')
    })
  }

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
          <span style={{display:'flex',justifyContent:'right'}} onClick={()=>closemodal()}>닫기</span>
          <h2 style={{margin:0, color:'red'}}>회원탈퇴</h2>
          <p>계정의 모든 데이터가 삭제됩니다. <br />
          {isLogin.socialType==='X' ? 
           <span>본인인증을 위해 비밀번호를 입력해주세요.</span>
          : <span>'회원탈퇴'를 입력해주세요.</span>}</p>
          <input className={styles.input_account} type={isLogin.socialType==='X' ? 'password':'text'} value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="current-password"/>
          <div style={{marginTop:'10%',display:'flex',width:'70%',marginLeft:'15%',justifyContent:'space-evenly',alignItems:'center'}}>
              <div style={{width:'30%',backgroundColor:'#F27474',borderRadius:10,padding:'5px 10px',border:'0.5px solid black',color:'black'}} onClick={withdraw}>탈퇴</div>
              <div style={{width:'30%',backgroundColor:'#7290FA',borderRadius:10,padding:'5px 10px',border:'0.5px solid black',color:'black'}} onClick={()=>{closemodal()}}>취소</div>
          </div>
      </div>
    </div>
  );
};

export default WithDraw;