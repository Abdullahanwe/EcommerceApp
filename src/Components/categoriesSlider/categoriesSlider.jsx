import React, { useEffect, useState } from 'react'
import style from './categoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function CategoriesSlider() {


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024, // الشاشات الأكبر من 1024px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768, // الشاشات الأكبر من 768px وأصغر من 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480, // الشاشات الأصغر من 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const [categories, setCategories] = useState([]); 
 
  async function getResentCategories() {
      try{
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data)
    }catch(err){
      console.log(err); 
        }
  }
  
  useEffect(()=>{
    getResentCategories()
  },[]);
  return <>

<Slider {...settings}>
  {categories?.map((category, index) => (
    <div key={index} className='my-4 px-2 '>
      <img 
        src={category.image} 
        className='w-full h-[250px] sm:h-[200px] md:h-[250px] lg:h-[300px] mt-4 object-cover' 
        alt={category.name}
      />
      <h3 className='text-sm sm:text-md md:text-lg lg:text-xl mt-2 text-center'>
        {category.name}
      </h3>
    </div>
  ))}
</Slider>


  </>
}
