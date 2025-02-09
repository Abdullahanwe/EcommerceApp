import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { WishlistContext } from '../../Context/WishlastContext';

const RecentProducts = ({product}) => {
    

    let {addProudactToCart} = useContext(CartContext)
  let{addWishlist}=useContext(WishlistContext)
    

    return (
        <>
            <div className=" p-4 product relative">
                       <button  onClick={()=>addWishlist(product._id)} className='absolute right-3  wish'> 
                        <i className='fa-solid fa-heart text-2xl text-main z-40' ></i></button>
                <Link to={`productdetails/${product.id}/${product.category.name}`}>
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
                <button onClick={()=>addProudactToCart(product.id)} className='btn w-full bg-main text-white rounded py-1'><i className="fa-solid fa-cart-arrow-down text-2xl"></i></button>
            </div>
        </>
    );
}

export default RecentProducts;
