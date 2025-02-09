import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import Brands from '../Brands/Brands'
import { CounterContext } from '../../Context/CounterContext'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loding from '../Loding/Loding'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'
import MianSlide from '../mianSlide/mianSlide'
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function Home() {
  const [products, setProducts] = useState([]);
 
  async function getResentProducts() {
      try{
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      // console.log(data?.data);
      setProducts(data?.data)
        products = data?.data;
    }catch(err){
      console.log(err); 
        }
  }
  useEffect(()=>{
    Aos.init()
  },[])
  useEffect(()=>{
    getResentProducts()
    
  },[])

  return <>
    <MianSlide/>
    <CategoriesSlider/>

    {products.length? <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mx-7">
  {products.map((product,index)=> <RecentProducts key={index} product={product}/>)}
  </div>: <div className="flex h-screen justify-center items-center" >
        <Loding/> 
    </div>}

  </>
}
