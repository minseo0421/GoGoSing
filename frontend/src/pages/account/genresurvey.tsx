import React,{useState,useEffect} from "react";
import styled from './genresurvey.module.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const GenreSurvey: React.FC = () => {
  const [genres, setGenres] = useState([1,2,3,4,5,6,7,8,9])
  const [selgenres, setSelGenres] = useState<number[]>([])
  const navigate = useNavigate();

  useEffect(()=>{
    axios({
      method:'get',
      url:'',
      headers:{
        Authorization:''
      }
    }).then(res=>{
      setGenres(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const genreSel = (sel:number) => {
    if (selgenres.includes(sel)) {
      // 이미 선택된 genre라면 제거
      setSelGenres(selgenres.filter((item) => item !== sel));
    } else {
      if (selgenres.length === 3){alert('배불렁')}
      // 선택되지 않은 genre라면 추가
      else {
        setSelGenres([...selgenres, sel]);
      }
    }
  }
  const submit = () => {
    axios({
      method:'post',
      url:'',
      headers:{
        Authorization:''
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    navigate('/')
  }

  return (
    <div className={styled.container}>
        <h1>좋아하는 장르를 <br /> 선택해주세요!</h1>
        <p>(최대 3개까지 선택할 수 있어요)</p>
        <div className={styled.genrelist}>
          {genres.map(genre => {
            return (
              <div onClick={()=>{genreSel(genre)}} className={`${styled.genre} ${selgenres.includes(genre) ? styled.sel_genre : ''}`}>
              {genre}
              </div>
          )})}
        </div>
        {selgenres.length===0 ? <button className={styled.btn} onClick={()=>navigate('/')}>다음에..</button> 
        : <button className={styled.btn}  onClick={submit}>적용하기</button> }
    </div>
  );
};

export default GenreSurvey;