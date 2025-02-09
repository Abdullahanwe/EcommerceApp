import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Checkout from "../Components/Checkout/Checkout";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    let headers = {
        token: localStorage.getItem("userToken")
    }
    console.log(localStorage.getItem('userToken'));

    const [cart, setCart] = useState(null)
    const [loding, setLoding] = useState(false)

    async function checkout(shippingAddress) {
        try {
            setLoding(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, {
                shippingAddress
            }, {
                headers
            });
            console.log(data);
            window.location.href = data.session.url

            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false)
        }
    }
    async function addProudactToCart(productId) {
        try {
            setLoding(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            }, {
                headers
            });
            toast.success(data.message, {
            })
            setCart(data)
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false)
        }
    }

    async function getCart() {
        try {
            setLoding(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });

            console.log(data);
            setCart(data)
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false)
        }
    }
    async function removeProduct(productId) {

        try {
            setLoding(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers
            });


            setCart(data)
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false);
        }


    }
    async function clearCart() {

        try {
            setLoding(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });


            setCart(null)
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false);
        }


    }
    async function updateProductCount(productId, count) {
        if (count > 0) {
            try {
                setLoding(true);
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                    count
                }, {
                    headers
                });


                setCart(data)
                setLoding(false)
            } catch (error) {
                console.log(error);
                setLoding(false);
            }
        } else {
            removeProduct(productId);
        }

    }
    useEffect(() => {
        getCart()
    }, [])
    return <CartContext.Provider value={{ clearCart, checkout, removeProduct, loding, addProudactToCart, getCart, cart, setCart, updateProductCount }}>
        {children}
    </CartContext.Provider>
}