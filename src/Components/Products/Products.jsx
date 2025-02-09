import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loding from '../Loding/Loding';
import { WishlistContext } from '../../Context/WishlastContext';


export default function Products() {
const [product, setProduct] = useState([])
  async function getProducts() {
  
  try{
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    
   

    setProduct(data?.data);
  }catch(err){
console.log(err);

  }
}

useEffect(()=>{
  getProducts()
},[])
let {addProudactToCart} = useContext(CartContext)
let {addWishlist}=useContext(WishlistContext)
  
  return <>
     {product.length?<div className=" grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  mx-7">
      {product.map((product)=>  <div className=" p-4 product relative ">
        <button onClick={()=>addWishlist(product.id)} className='absolute right-5  wish text-2xl z-10'><i className='fa-solid fa-heart text-main '></i></button>

      <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
          <div className='relative'>
              <img src={product.imageCover} className='w-full' alt={product.title} />
              <h2 className='text-main text-sm'>{product.category?.name}</h2>
              {/* <button onClick={} className='absolute right-0 bg-black'><i className='fa-solid fa-heart  text-red-700 '></i></button> */}

              <h2 className='font-medium'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
          </div>
          <div className="flex justify-between my-2" >
              <h3>{product.price} EGP</h3>
              <h3><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h3>
          </div>
      </Link>
      <button onClick={()=>addProudactToCart(product.id)} className='btn w-full bg-main text-white rounded py-1'>Add To Cart</button>
  </div>)}
  </div>: <div className="flex h-screen justify-center items-center">
        <Loding/> 
    </div>}
 
  
  </>
}
