import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik, validateYupSchema,  } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Register() {

  const [apiError, setApiError] = useState(null)
    const [loding, setLoding] = useState(false)
  const navigate = useNavigate();
 let {setUserData}= useContext(UserContext);

  async function handelRegister(values ){
    try{
      setLoding(true);
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);   
      localStorage.setItem('userToken' , data.token );  
      navigate("/");
      setUserData(data.token)
      setLoding(false);
    }catch(err){
    setApiError(err?.response?.data?.message); 
    setLoding(false);
    }
    
      
  } 


  let validateYupSchema = Yup.object().shape({
    name: Yup.string().min(3,'min lenght is 3').max(10,'max 10').required('Name is required'),
    emai:Yup.string().email('eamil invaled').required('email is required'),
    password: Yup.string().matches(/^[A-Z]\w{5,10}$/,'password invaled ex:Abdullah123').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')], 'password dont match').required('rePassword is required'),
    phone:Yup.string().matches(/^(002)?01[125][0-9]{8}$/,'phone must be Egyption number').required('phone is required')
  })

  let formik = useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
  },
  validateYupSchema,
  onSubmit:handelRegister
  })

  return <>

    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto pt-16 pb-16 p-4"> 
    <h1 className="text-3xl">Register</h1>
    {apiError && <div class="py-2 px-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
        {apiError}
        </div>}
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name:</label>
      </div>
      {formik.errors.name && formik.touched.name && <div class="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
        {formik.errors.name}
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

      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-balck dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your rePassword:</label>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword && <div class="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
        {formik.errors.rePassword}
        </div>}

      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-balck dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone:</label>
      </div>
      {formik.errors.phone && formik.touched.phone && <div class="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
        {formik.errors.phone}
        </div>}
    {loding? <button type="botton" className="text-white bg-emerald-700 hover:bg-emerald-700  focus:outline-none focus:bg-emerald-700 font-medium rounded-lg text-md w-full sm:w-auto px-3 py-1 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700">
        <i className='fas fa-spinner fa-spin-pulse'></i>
      </button>: <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-700  focus:outline-none focus:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700">Submit</button>
    }
    </form>


  </>
}
