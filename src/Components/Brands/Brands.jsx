import React, { useContext, useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { data } from 'autoprefixer'
import Loding from '../Loding/Loding'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

export default function Brands() {
let{addProudactToCart}=useContext(CartContext)
const [brands, setBrands] = useState([])
async function getBrand() {
  
  try{
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    
    setBrands(data?.data)
  }catch(err){
    console.log(err);
    
  }
}
useEffect(()=>{
  getBrand();
},[])
    
  return <>
    
    {brands.length?<div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2   mx-7">
      {brands.map((brand)=><div className=" p-4 brand product ">
      {/* <Link to={`/productdetails/${brand.id}/${brand?.data?.name}`}> */}
          <div>
              <img src={brand?.image} className='w-full' alt={brand?.data?.name} />
              <h2 className='text-main text-sm'>{brand.data?.name}</h2>
          </div>
      {/* </Link> */}
  </div>)}
    </div>:<div className="flex h-screen justify-center items-center">
        <Loding/> 
    </div>}
  
  </>
}
