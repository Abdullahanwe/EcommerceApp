import React, { useState } from 'react'
import style from './Loding.module.css'
import { RevolvingDot, ThreeDots } from 'react-loader-spinner'

export default function Loding() {



    
  return <>
    

    <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  // radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </>
}
