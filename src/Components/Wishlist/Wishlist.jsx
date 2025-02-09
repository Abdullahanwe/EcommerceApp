import React, { createContext, useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlastContext';
import ProductDetails from '../ProductDetails/ProductDetails';
import Loding from '../Loding/Loding';

const Wishlist = () => {

let{wishlists,getWishList,deleteProduct}=useContext(WishlistContext)
useEffect(()=>{
    getWishList()
    },[])
   


    return (
        
        <div>
        {wishlists.length > 0 ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2   mx-7">
            {wishlists.map((item) => (
              <div key={item._id} className="p-4 mt-4 product relative">
                <div>
                  <img src={item.imageCover} className="w-full" alt={item.name} />
                  <h2 className="text-main text-sm">{item.name}</h2>
                  <h2 className="font-medium">
                    {item.title}
                  </h2>
                </div>
                <div className="flex justify-between my-2">
                <h3>{item.price} EGP</h3>
                <h3>
                    <i className="fas fa-star rating-color"></i> {item.ratingsAverage}
                </h3>
                </div>
                <button onClick={()=> deleteProduct(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline"><i class="fa-solid fa-trash-can"></i> Remove</button>
            </div>
            ))}
        </div>
          ) : <div className='flex justify-center h-screen items-center'><Loding/></div>}
      </div>
    )
}

export default Wishlist;


