import React, { useEffect, useState } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import styles from "./musicsearch.module.css";
import axios from "axios";
import CardLongContainer from "../components/CardLong/CardLongContainer";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
  genreId:number[]|null;
  genreType:string|null;
}

const MusicSearch: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState("제목");
  const [searchdata, setSearchData] = useState<AlbumProps[]|null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(3));
  }, [dispatch]);

  const search = () => {
    if (keyword==='') {
      alert('검색어를 입력해주세요')
      return
    }
    // const token = localStorage.getItem('AccessToken')

    const sel = selectedValue==='제목' ? 'title' : selectedValue==='가수' ? 'singer': 'lyric'
    axios({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/search/${sel}?keyword=${keyword}`,
      // headers:{
      //   Authorization:`Bearer ${token}`
      // }
    }).then(res=>{
      console.log(res)
      setSearchData(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div style={{height:'100%', width:'100%'}}>
      <div className={styles.topbar} style={isInputFocused ? {height: '27%'}: {}}>
        <span style={{fontSize:'20px',marginBottom:'5px'}}>검색</span>
        <div style={{display:'flex', width:'100%',justifyContent:'center'}}>
          <select style={{borderRadius:10, background:'rgba(245, 246, 246, 0.4)', width:'20%', textAlign:'center',boxSizing:'border-box',marginRight:10}}
          value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
            <option value="제목" key={'제목'}>제목</option>
            <option value="가수" key={'가수'}>가수</option>
            <option value="가사" key={'가사'}>가사</option>
          </select>
          <input type="text" style={{width:'80%', borderRadius:10, border:'none', padding:'3px 35px 3px 10px', background:'rgba(245, 246, 246, 0.4)', boxSizing:'border-box'}} placeholder="검색어를 입력해주세요." 
          value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} onKeyDown={(e)=>{if(e.key==='Enter') {search();e.currentTarget.blur();}}} 
          onFocus={() => {
            setIsInputFocused(true); // 입력란이 포커싱될 때 상태 변경
          }}
          onBlur={() => {
            setIsInputFocused(false); // 입력란이 포커싱을 잃을 때 상태 변경
          }}/>
          <img style={{marginLeft:'-30px'}} src="assets/search_icon.png" alt="" onClick={()=>search()} />
        </div>
      </div>
      <div style={isInputFocused ? {height: "71%", overflow: "auto", margin:'2% 0' ,boxSizing:'border-box'}: { height: "88%", overflow: "auto", margin:'2% 0' ,boxSizing:'border-box'}}>
        {/* 여기가 메인 영역 */}
          {searchdata===null ? 
          <div>
            <p>실시간 인기 검색어</p>
          </div>:
          searchdata.length===0 ?
          <div>
            <p>검색 결과가 없습니다.</p>
          </div>
        : <div>
            <CardLongContainer albums={searchdata} />
          </div> 
        }
      </div>
    </div>
  );
};
export default MusicSearch;
