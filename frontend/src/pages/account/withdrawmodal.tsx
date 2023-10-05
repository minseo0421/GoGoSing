import React, {useState} from "react";
import styles from './withdrawmodal.module.css'
import axiosInstance from "../../axiosinstance";

interface Props {
    closemodal: ()=>void;
    logout:()=>void;
}
const WithDraw: React.FC<Props> = ({closemodal,logout}) => {
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
          <h2 style={{margin:0}}>회원탈퇴</h2>
          <p>계정이 영구적으로 삭제됩니다. <br />본인인증을 위해 비밀번호를 입력해주세요</p>
          <input className={styles.input_account} type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="current-password"/>
          <div style={{marginTop:'10%'}}>
              <button style={{width:'40%',marginRight:'10%'}} onClick={withdraw}>탈퇴</button>
              <button style={{width:'40%'}} onClick={()=>{closemodal()}}>취소</button>
          </div>
      </div>
    </div>
  );
};

export default WithDraw;