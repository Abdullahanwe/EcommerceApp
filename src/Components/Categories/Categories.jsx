import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import { data } from 'autoprefixer';
import Loding from '../Loding/Loding';
import { Link } from 'react-router-dom';

export default function Categories() {

const [categorie, setCategorie] = useState([]);

async function getCategories() {
  try{
    let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategorie(data?.data);

  }catch(err){
    console.log(err);
    
  }
}
 useEffect(()=>{
  getCategories()
 },[])
    
  return <>
    
    {categorie.length?<div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  mx-7">
      {categorie.map((categorie)=><div className=" p-4 categorie product">
          <div>
              <img src={categorie?.image} className='w-full h-[250px]' alt={categorie?.data?.name} />
              <h2 className='text-main text-sm'>{categorie.data?.name}</h2>
          </div>
  </div>)}
    </div>:<div className="flex h-screen justify-center items-center">
        <Loding/> 
    </div>}
  </>
}
