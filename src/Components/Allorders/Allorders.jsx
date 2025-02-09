import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import { CartContext } from '../../Context/CartContext'

export default function Allorders() {

let{clearCart} = useContext(CartContext)

    useEffect(()=>{
      clearCart()
    },{})
  return <>
    
    <h1 className="text-3xl">Allorders</h1>
  
  </>
}
