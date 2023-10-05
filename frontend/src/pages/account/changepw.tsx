import React, {useState} from "react";
import styles from './changepw.module.css'
import axiosInstance from "../../axiosinstance";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    closemodal: ()=>void;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(9, '9 자 이상, 영문/숫자/특수문자 1개 이상 포함')
    .max(15, '15 자 이하의 패스워드를 입력해주세요')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,15}$/, '영문/숫자/특수문자 1개 이상 포함')
    .required('비밀번호를 입력해주세요'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 확인해주세요'),
});

const ChangePW: React.FC<Props> = ({closemodal}) => {
  const [nowpassword, setNowPassword] = useState('')

  const formik = useFormik({
    initialValues: {
        password: '',
        confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        // 비밀번호 변경 요청 로직
        if (nowpassword==='' || values.password==='' || values.confirmPassword==='') {
          alert('비밀번호를 입력해주세요')
          return
        }
        if (nowpassword===values.password){
          alert('변경 전 비밀번호와 동일합니다')
          return
        }
        axiosInstance({
            method:'put',
            url:`${process.env.REACT_APP_API_URL}/user/update/password`,
            data:{
              checkPassword:nowpassword,
              newPassword:values.password
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
        }).then(res=>{
            console.log(res)
            alert('비밀번호가 변경되었습니다')
            closemodal()
        }).catch(err=>{
            console.log(err)
            alert('현재 비밀번호가 일치하지 않습니다.')

        })

    },
});

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <span style={{display:'flex',justifyContent:'right'}} onClick={()=>closemodal()}>닫기</span>
        <h2 style={{margin:0}}>비밀번호 변경</h2>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <p style={{display:'flex'}}>현재 비밀번호</p>
          <input className={styles.input_account} type="password" placeholder="현재 비밀번호" value={nowpassword} onChange={(e)=>{setNowPassword(e.target.value)}} autoComplete="current-password" />
          {/* 패스워드 input */}
          <br />
          <p style={{display:'flex'}}>새 비밀번호</p>
          <input className={styles.input_account} type="password" placeholder="새 비밀번호" {...formik.getFieldProps('password')} autoComplete="new-password"/>
          <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'center'}}>
              {formik.values.password === '' ? <span>　</span> : formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : <span style={{color:'green'}}>사용할 수 있는 비밀번호입니다.</span>}
          </p>
          {/* 패스워드 확인 input */}
          <input className={styles.input_account} type="password" placeholder="비밀번호 확인" {...formik.getFieldProps('confirmPassword')}  autoComplete="new-password"/>
          <p style={{fontSize:'8px', fontWeight:'bold', textAlign:'center',  color:'red'}}>
            {formik.values.confirmPassword === '' ? <span>　</span> : formik.errors.confirmPassword ? <span>{formik.errors.confirmPassword}</span> : formik.errors.password ? <span>비밀번호를 확인해주세요.</span>:<span style={{color:'green'}}>비밀번호가 일치합니다.</span>}
          </p>
          <div style={{marginTop:'1%'}}>
              <button style={{width:'40%',marginRight:'10%'}} type='submit'>변경</button>
              <button style={{width:'40%'}} type='button' onClick={()=>{closemodal()}}>취소</button>
          </div>
        </form>
    </div>
    </div>
  );
};

export default ChangePW;