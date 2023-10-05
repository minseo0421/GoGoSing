import React,{ useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import CardCarousel from './CardLong/CardCarousel';

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
}

const CarouselComponent = () => {
    const [albums, setAlbums] = useState<AlbumProps[]>([])
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
            <CardCarousel album={album} />
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
