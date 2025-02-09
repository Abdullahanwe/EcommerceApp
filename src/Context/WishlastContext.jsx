import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [wishlists, setWishlists] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  
  async function getWishList() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers,
        }
      );

      setWishlists(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addWishlist(productId) {
    console.log('hello');
  
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      );
     
      setWishlists(data?.data);
      toast.success(data.message, {});
      setIsAdd(productId,true)
    } catch (error) {
      console.log(error);
    }
  

  }
  async function deleteProduct(productId ) {
        
    try {
      
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers 
        });

     
        setWishlists(data.data)
       
    } catch (error) {
        console.log(error);
        
    }


}
  useEffect(() => {
    getWishList();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlists, getWishList, addWishlist,deleteProduct , isAdd}}>
      {children}
    </WishlistContext.Provider>
  );
}
