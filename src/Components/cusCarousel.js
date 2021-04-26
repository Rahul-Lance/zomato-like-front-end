import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Styles/carousel.css';

import React from 'react';

const cusCarousel = ({images}) => {
  return (
    <>
    {
      images ? <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
      {
        images.map((img,index) => {
          const imgPath = require('../'+img).default;
           return <div key={index} style={{backgroundImage:`url(${imgPath})`}}>
            <button className="gallery">Click to see Image Gallery</button>
          </div>
        })
      }
    </Carousel> : null
    }
    </>
  )
}

export default cusCarousel;
