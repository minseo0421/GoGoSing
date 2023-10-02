import CardSmall from "./CardSmall";
import React, { useState, useRef,useEffect } from "react";
import styles from "./CardSmallContainer.module.css";
import axiosInstance from "../../axiosinstance";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
  genreId:number[]|null;
  genreType:string|null;
}
interface Props {
  albums : AlbumProps[]
}

const CardSmallContainer: React.FC<Props> = ({albums}) => {
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [likelist, setLikeList] = useState<number[]|null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    const x = "touches" in e ? e.touches[0].pageX : e.pageX;

    if (containerRef.current) {
      setStartX(x);
      setScrollLeft(containerRef.current.scrollLeft);
      setIsDragging(true);
    }
  };

  const handleMove = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !containerRef.current) return;

    const x = "touches" in e ? e.touches[0].pageX : e.pageX;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
  };
  useEffect(()=>{
    const AccessToken = localStorage.getItem('AccessToken')
    axiosInstance({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/music/like`,
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
    }).then(res=>{
      const likelists = res.data.map((item:{musicId:number,singer:string,songImg:string|null,title:string}) => item.musicId)
      setLikeList(likelists)
    }).catch(err=>{
      console.log(err)
    })
  },[])
  /* onTouch 관련은 Mobile 환경에서 터치가 있을 때, onMouse는 Web 환경에서 Mobile 처럼 클릭하고 이동 할 때의 케이스 */
  return (
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
    >
      {albums.map((album) => {
        return <CardSmall album={album} like={likelist===null ? null : likelist.includes(album.musicId) ? true: false} />; // 각 ChartLong 컴포넌트에 album 데이터를 prop으로 전달합니다.
      })}
    </div>
  );
};

export default CardSmallContainer;
