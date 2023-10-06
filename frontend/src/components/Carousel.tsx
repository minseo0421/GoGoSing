import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardCarousel from './CardLong/CardCarousel';


interface AlbumProps {
  albums : {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
  }[]
}

const CarouselComponent: React.FC<AlbumProps>  = ({albums}) => {
  return (
    <Carousel showStatus={false} showIndicators={false} autoPlay={true} interval={5000} infiniteLoop={true} showThumbs={false} swipeable={false}>
       {albums.map((album) => (
            <CardCarousel album={album} />
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
