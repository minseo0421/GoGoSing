import React,{ useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import CardCarousel from './CardLong/CardCarousel';
import axiosInstance from '../axiosinstance';

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
}

const CarouselComponent = () => {
    const [albums, setAlbums] = useState<AlbumProps[]>([])
    useEffect(()=>{
      const AccessToken = localStorage.getItem('AccessToken')
      if (AccessToken) {
        axiosInstance({
          method:'get',
          url:`${process.env.REACT_APP_API_URL}/genre/like/list`,
          headers:{
            Authorization:`Bearer ${AccessToken}`
          }
        }).then(res=>{
            setAlbums(res.data)
        }).catch(err=>{
          console.log(err)
        })
      } else {
        axios({
          method:'get',
          url:`${process.env.REACT_APP_API_URL}/genre/list`,
        }).then(res=>{
            setAlbums(res.data)
        }).catch(err=>{
          console.log(err)
        })
      }
    },[])
  return (
    <Carousel showStatus={false} showIndicators={false} autoPlay={true} interval={5000} infiniteLoop={true} showThumbs={false} swipeable={false}>
       {albums.map((album) => (
            <CardCarousel album={album} />
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
