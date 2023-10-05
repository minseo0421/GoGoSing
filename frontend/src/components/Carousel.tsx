import React,{ useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosInstance from '../axiosinstance';
import axios from 'axios';
import CardCarousel from './CardLong/CardCarousel';

interface AlbumProps {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
    genreInfo:{
      genreId:number[];
      genreType:string;
    }[];
    viewCount:number;
  }

const CarouselComponent = () => {
    const [likelist, setLikeList] = useState<number[]|null>(null);
    const [albums, setAlbums] = useState<AlbumProps[]>([])

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
    useEffect(()=>{
        axios({
          method:'get',
          url:`${process.env.REACT_APP_API_URL}/music/chart`,
        }).then(res=>{
            setAlbums(res.data)
        }).catch(err=>{
          console.log(err)
        })
    },[])
  return (
    <Carousel showStatus={false} showIndicators={false} autoPlay={true} interval={5000} infiniteLoop={true} >
       {albums.slice(0,10).map((album) => (
            <CardCarousel album={album} like={likelist === null ? null : likelist.includes(album.musicId) ? true : false} />
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
