import React,{useState} from "react";
import styled from './genresurvey.module.css'


const GenreSurvey: React.FC = () => {
  const [genres, setGenres] = useState([1,2,3,4,5,6,7,8,9])
  const [selgenres, setSelGenres] = useState<number[]>([])

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
  return (
    <div className={styled.container}>
      <p>x</p>
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
    </div>
  );
};

export default GenreSurvey;