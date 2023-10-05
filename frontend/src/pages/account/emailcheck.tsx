import React, {useState,useEffect} from "react";
import styles from './emailcheck.module.css'
import axios from "axios";
interface Props {
    email:string;
    closemodal: ()=>void;
    success:(value:string) => void;

}
const EmailCheck: React.FC<Props> = ({email,closemodal,success}) => {
    const [isNum, setNum] = useState<string>('')
    const [isTime, setTime] = useState(300); // 3분은 180초

    useEffect(() => {
        if (isTime > 0) {
          const timer = setTimeout(() => {
            setTime(isTime - 1);
          }, 1000); // 1초마다 1초씩 감소
    
          return () => {
            clearTimeout(timer);
          };
        } else {
            closemodal();
          }
      }, [isTime,closemodal]);

    const checknum = () => {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/email/verify`,
            data:{email:email,certificationNumber:isNum}
        }).then(res=>{
            success(isNum)
            closemodal()
            alert('인증성공! 회원가입을 계속 진행해주세요.')
        }).catch(err=>{
            alert('인증실패')
        })
    }

  return (
    <div className={styles.modal}>
        <span style={{display:'flex',justifyContent:'right'}} onClick={()=>closemodal()}>닫기</span>
        <div>
            <p>이메일 "{email}" 으로 <br />인증번호가 발송되었습니다. <br />시간 내에 인증해주세요.</p>
            <p style={{marginTop:-10}}>남은시간 : 0{Math.floor(isTime/60)}:{isTime%60 <10 ? '0'+isTime%60: isTime%60}</p>
            <input className={styles.input} 
            type="text" placeholder="비밀번호" value={isNum} onChange={(e)=>{setNum(e.target.value)}} />
        </div>
        <div style={{margin:'20px 0'}}>
            <button className={styles.btn} style={{marginRight:'10px',backgroundColor:'#7290FA',border:'1px solid white'}} onClick={()=>checknum()}>확인</button>
            <button className={styles.btn} style={{marginLeft:'10px',backgroundColor:'#F27474',border:'1px solid white'}} onClick={()=>closemodal()}>취소</button>
        </div>
    </div>
  );
};

export default EmailCheck;

