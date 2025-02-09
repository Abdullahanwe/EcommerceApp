import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import axios from 'axios'
import { useFormik , validateYupSchema, } from 'formik';
import * as Yup from 'yup'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export default function Login() {

const [apiError, setApiError] = useState(null);
const [loding, setLoding] = useState(false)
const navigate = useNavigate();
let {setUserData} =  useContext(UserContext)
useState()
 async function handelLogin(values){
  try{
    setLoding(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
    
    localStorage.setItem('userToken' , data.token);
    navigate("/");
    setUserData(data.token)
    setLoding(false)
  }catch(err){
    setApiError(err?.response?.data?.message);
    setLoding(false);
  }

 }


 let validateYupSchema = Yup.object().shape({
  emai:Yup.string().email('eamil invaled').required('email is required'),
  password: Yup.string().matches(/^[A-Z]\w{5,10}$/,'password invaled ex:Abdullah123').required('password is required'),
})


let formik = useFormik({
initialValues:{
  email:'',
  password:'',
  
},
validateYupSchema,
onSubmit:handelLogin
})

    
  return  <>

  <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto  pt-36 pb-44 px-6"> 
  <h1 className="text-3xl bg-black text-main mb-5 rounded-md bg-clip-text">LogIn Now  </h1>
  {apiError && <div class="py-2 px-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
      {apiError}
      </div>}
    <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-balck dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email:</label>
    </div>
    {formik.errors.email && formik.touched.email && <div class="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
      {formik.errors.email}
      </div>}
      
    <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-balck dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password:</label>
    </div>
    {formik.errors.password && formik.touched.password && <div class="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
      {formik.errors.password}
      </div>}

  {loding? <button type="botton" className=" text-white bg-emerald-700 hover:bg-emerald-700  focus:outline-none focus:bg-emerald-700 font-medium rounded-lg text-md w-full sm:w-auto px-3 py-1 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700">
      <i className='fas fa-spinner fa-spin-pulse'></i>
    </button>: <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-700  focus:outline-none focus:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700">Login</button>
  }
  <NavLink to="/forgetpassword"  className="font-medium text-red-600 ml-5 dark:text-red-500 hover:underline">Forget password</NavLink>

  
  </form>


</>
}


