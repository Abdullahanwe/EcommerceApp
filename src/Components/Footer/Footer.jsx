import React, { useState } from 'react'
import style from './Footer.module.css'

export default function Footer() {



    
  return <>

<div className="bg-gray-200 py-10 px-4 mt-auto">
      <h2 className='text-xl font-semibold mb-4'>Get the Fresh Cart App</h2>
      <p className='text-gray-600 mb-6'>
        We will send you a link, open it on your phone to download the app.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center mb-6">
        <input type="text"className='md:w-3/4 w-full rounded-md  p-2 mb-3 md:mb-0'/>
        <button className='btn bg-main text-white rounded py-2 px-5'>
          Share App Link
        </button>
      </div>
      <div className='flex flex-col md:flex-row justify-between text-center md:text-left'>
        <span className="mb-3 md:mb-0">
          <p>Payment Partners</p>
        </span>
        <span>
          Get deliveries with FreshCart
        </span>
      </div>
    </div>
  
  </>
}
