
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import CounterContextProvider from './Context/CounterContext.jsx'
import UserContextProvider, { UserContext } from './Context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider, { CartContext } from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout.jsx'
import Allorders from './Components/Allorders/Allorders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsContextProvider, { ProductsContext } from './Context/ProductContxt.jsx'
import WishlistContextProvider from './Context/WishlastContext.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'
import ForgetPassword from './ForgetPassword/ForgetPassword.jsx'




let routers = createHashRouter([
  {path: '' , element: <Layout/>, children :[
    {index: true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'checkout' , element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id/:category' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'register', element:<Register/>},
    {path:'login' , element:<Login/>},
    {path:'forgetpassword' , element:<ForgetPassword/>},
    {path:'*' , element:<Notfound/>},
  ]}
])

let query = new QueryClient();
function App() {

  return <QueryClientProvider client={query}> 
  <WishlistContextProvider>
    <CartContextProvider>
    <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster/>
       
      </UserContextProvider>
    </CartContextProvider>
    </WishlistContextProvider>
  </QueryClientProvider>
}

export default App
