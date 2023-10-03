import React from "react";
import styles from './withdrawmodal.module.css'

interface Props {
    closemodal: ()=>void;
}
const WithDraw: React.FC<Props> = ({closemodal}) => {

  return (
    <div className={styles.modal}>
        <span style={{display:'flex',justifyContent:'right'}} onClick={()=>closemodal()}>닫기</span>
        <h2 style={{margin:0}}>회원탈퇴</h2>
        <p>계정이 영구적으로 삭제됩니다. <br />진행하시겠습니까?</p>
        <input type="text" />
        <div style={{marginTop:'10%'}}>
            <button style={{width:'40%',marginRight:'10%'}}>탈퇴</button>
            <button style={{width:'40%'}}>취소</button>
        </div>
    </div>
  );
};

export default WithDraw;