import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import Loding from '../Loding/Loding'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlastContext';

export default function ProductDetails() {

let {id , category} = useParams();
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows:false,
  autoplay:true,
  autoplaySpeed:1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

  let{addProudactToCart} = useContext(CartContext);
let{addWishlist}=useContext(WishlistContext)
const [productDetails, setProductDetails] = useState({})
  async function getProductDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProductDetails(data.data)
    
  }

  const [sliderDedails, setSliderDedails] = useState([]);
 
const [isLoding, setIsLoding] = useState(false)
    async function fetchsliderDedails(category) {
      
      try{
        setIsLoding(true)
      let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      console.log(data?.data);
     let allProudacts =data?.data;
     let related = allProudacts.filter((product)=> product.category.name == category);     
        setSliderDedails(related)
     setIsLoding(false)
      
    }catch(err){
      console.log(err);
    }
    }
  useEffect(()=>{
    getProductDetails(id);
    fetchsliderDedails(category); 
  },[id , category]);
  return <>
        {!isLoding? <>
          <div className="flex flex-col md:flex-row items-start md:items-center py-10">
      <div className="w-full md:w-1/3 p-4">
        <Slider {...settings}>
          {productDetails.images?.map((image, index) => (
            <img src={image} key={index} className='w-full h-auto' alt='' />
          ))}
        </Slider>
      </div>
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-semibold">{productDetails.title}</h2>
        <p className='my-4 text-gray-500'>{productDetails.description}</p>
        <h3 className="text-lg font-medium">{productDetails.category?.name}</h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
          <h3 className="text-xl font-bold">{productDetails.price} EGP</h3>
          <h3 className="flex items-center">
            <i className='fas fa-star rating-color'></i> {productDetails.ratingsAverage}
          </h3>
        </div>
        <button 
          onClick={() => addProudactToCart(productDetails.id)} 
          className='btn bg-main text-white rounded py-2 px-4 w-full md:w-full'
        >
          Add To Cart
        </button>
      </div>
    </div>
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  mx-5 " >
      {sliderDedails.map((product)=> 
        <div className="  p-4 product relative mx-">
              <button onClick={()=>addWishlist(product.id)} className='absolute right-3 wish text-2xl'><i className='fa-solid fa-heart  text-main'></i></button>
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
            <div className=''>
              <img src={product.imageCover} className='w-full' alt={product.title} />
              <h2 className='text-main text-sm'>{product.category.name}</h2>

              <h2 className='font-medium'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
            </div>
            <div className="flex justify-between my-2" >
              <h3>{product.price} EGP</h3>
              <h3><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h3>
            </div>
          </Link>
            <button onClick={()=>addProudactToCart(productDetails.id)} className='btn w-full bg-main text-white rounded py-1'>Add To Cart</button>
        </div>)}
    </div>
      </>:<div className="flex h-screen justify-center items-center"> <Loding/></div>}
  </>
}
