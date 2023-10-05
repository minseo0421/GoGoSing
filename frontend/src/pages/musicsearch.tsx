import React, { useEffect, useRef, useState } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import styles from "./musicsearch.module.css";
import axios from "axios";
import CardLong from "../components/CardLong/CardLong";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
}
const MusicSearch: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState("제목");
  const [searchdata, setSearchData] = useState<AlbumProps[]|null>(null);
  const [searchrank, setSearchRank] = useState<{rank:number, keyword:string}[]|null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(3));
  }, [dispatch]);

  useEffect(()=>{
    axios({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/search/ranking`,
    }).then(res=>{
      console.log(res)
      setSearchRank(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[searchdata])

  const search = () => {
    if (keyword==='') {
      alert('검색어를 입력해주세요')
      return
    }
    const sel = selectedValue==='제목' ? 'title' : selectedValue==='가수' ? 'singer': 'lyric'
    axios({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/search/${sel}?page=1&keyword=${keyword}`,
    }).then(res=>{
      setSearchData(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  const [startY, setStartY] = useState(0);
  const [scrollTop, setscrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState(0);
  const [pluspage, setpluspage] = useState(true);
  const [searchpage, setSearchPage] = useState(2);

  const handleStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    const y = "touches" in e ? e.touches[0].pageY : e.pageY;
    const x = "touches" in e ? e.touches[0].pageX : e.pageX; // X 축 시작 지점 추가

    if (containerRef.current) {
      setStartY(y);
      setStartX(x); // 저장
      setscrollTop(containerRef.current.scrollTop);
      setIsDragging(true);
    }
  };

  const handleMove = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !containerRef.current) return;

    const currentY = "touches" in e ? e.touches[0].pageY : e.pageY;
    const currentX = "touches" in e ? e.touches[0].pageX : e.pageX;

    // 시작점과 현재 점 사이의 X, Y 차이 계산
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);

    if (diffX > diffY) {
      return; // X축의 움직임이 더 클 경우 이벤트를 중지
    }

    // e.preventDefault();
    const walk = currentY - startY;
    containerRef.current.scrollTop = scrollTop - walk;

  };

  const handleEnd = () => {
    setIsDragging(false); 
    if (containerRef.current) {
      const isAtBottom = containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight;
      if (isAtBottom && pluspage) {
        // 스크롤이 제일 하단에 도달했을 때 loading 함수를 호출합니다.
        const sel = selectedValue==='제목' ? 'title' : selectedValue==='가수' ? 'singer': 'lyric'
        axios({
          method:'get',
          url:`${process.env.REACT_APP_API_URL}/search/${sel}?page=${searchpage}&keyword=${keyword}`,
        }).then(res=>{
          if (res.data.length>0) {
            setSearchData((prevAlbumData) => [...prevAlbumData!, ...res.data]); // 이전 상태를 이용하여 업데이트
            setSearchPage((prevSearchPage) => prevSearchPage + 1); // 이전 상태를 이용하여 업데이트
          } else {
            setpluspage(false)
          }
        }).catch(err=>{
          setpluspage(false)
        })
      }
    }
  };
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
      <div style={isInputFocused ? {height: "71%", margin:'2% 0' ,boxSizing:'border-box'}: { height: "88%", margin:'2% 0' ,boxSizing:'border-box'}}>
        {/* 여기가 메인 영역 */}
          
          {isInputFocused || searchdata===null ? 
          <div>
            <p style={{fontSize:20, fontWeight:'bold'}}>실시간 인기 검색어</p>
            {searchrank?.map((item:{rank:number, keyword:string}) => 
              <p style={{width:'60%', display:'flex', margin:'10px 20%',alignItems:'center'}}>
                <span style={{fontSize:20, fontWeight:'bold'}}>{item.rank}</span>
                <div style={{width:'100%'}}>
                  <span style={{fontSize:18, fontWeight:'bold'}}>{item.keyword}</span>
                </div>
              </p>
              )}
          </div>:
          searchdata.length===0 ?
          <div>
            <p>검색 결과가 없습니다.</p>
          </div>
        : <div style={{height:'100%'}}>
          <div
              className={styles.container}
              ref={containerRef}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              style={{ overflow:'auto'}}
            >
            {searchdata.map((album,index) => (
                <CardLong idx={index+1} album={album} />
              ))}
            </div>
            {/* <CardLongSearchContainer albums={searchdata} keyword={keyword} selectedValue={selectedValue} /> */}
          </div> 
        }
      </div>
    </div>
  );
};
export default MusicSearch;
