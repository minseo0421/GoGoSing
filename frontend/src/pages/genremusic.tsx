import React, { useEffect, useState } from "react";
import styles from "./genremusic.module.css";
import CardLongContainer from "../components/CardLong/CardLongContainer";
import axios from "axios";

interface AlbumProps {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
  }

const GenreMusic: React.FC = () => {

  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [chartpage, setChartPage] = useState('')
  useEffect(()=>{
    const params = new URL(document.location.toString()).searchParams;
    const type = params.get('type')
    if (type) {
        if (type==='RnB/Soul'){
            setChartPage('R&B/Soul')
            axios({
                method:'get',
                url:`${process.env.REACT_APP_API_URL}/genre/musicList?genreId=4`,
              }).then(res=>{
                setAlbums(res.data)
              }).catch(err=>{
                console.log(err)
              })
        } else {
            setChartPage(type)
            const id = type==='발라드'? 2:type==='댄스'? 1 : type==='랩/힙합'? 3:type==='R&B/Soul'? 4:type==='인디음악'? 5:type==='락/메탈'? 6:type==='트로트'? 7:type==='포크/블루스'? 8:type==='POP'? 9:type==='OST'? 10:type==='동요'? 11:type==='CCM'? 14:0
            axios({
                method:'get',
                url:`${process.env.REACT_APP_API_URL}/genre/musicList?genreId=${id}`,
              }).then(res=>{
                setAlbums(res.data)
              }).catch(err=>{
                console.log(err)
              })
        }
    } 
  },[])

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={styles.topbar}>
        <h2>{chartpage} 목록입니다</h2>
      </div>
      <div style={{ height: "100%", overflow: "scroll" }}>
        <CardLongContainer albums={albums} />
      </div>
    </div>
  );
};
export default GenreMusic;
