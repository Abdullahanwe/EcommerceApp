import React, { useState } from 'react'
import Slide1 from '../../assets/images/slider-image-1.jpeg'
import Slide2 from '../../assets/images/slider-image-2.jpeg'
import Slide3 from '../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

export default function MianSlide() {


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    slidesToShow: 1,
    slidesToScroll: 2,
  };
    
  return <>
    
    <div className="flex flex-col md:flex-row">
  <div className="md:w-3/4 w-full">
    <Slider {...settings}>
      <img src={Slide1} className='w-full h-[200px] md:h-[400px]' alt="" />
      <img src={Slide2} className='w-full h-[200px] md:h-[400px]' alt="" />
      <img src={Slide3} className='w-full h-[200px] md:h-[400px]' alt="" />
    </Slider>
  </div>
  <div className="md:w-1/4 w-full flex  md:flex-col ">
    <img src={Slide1} className='w-full h-[100px] md:h-[200px] mb-2 md:mb-0' alt="" />
    <img src={Slide2} className='w-full h-[100px] md:h-[200px]' alt="" />
  </div>
</div>

  </>
}
