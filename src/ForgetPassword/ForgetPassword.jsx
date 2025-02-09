import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loding from '../Components/Loding/Loding';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [forget, setForget] = useState([]);
   const navigate = useNavigate()
   const [loding, setLoding] = useState(false)

    async function forGetPass(values) {
        try {
          setLoding(true)
            let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
            console.log(response.data);
            toast.success(response.data.message, {});

            setForget(response.data); 
            localStorage.setItem('userToken' , data.token );  
            setLoding(false)
            navigate('/')
        } catch (error) {
            console.error("There was an error!", error);
            setLoding(false)
        }
    }

    let validateYupSchemafor = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
    });

    let formikforg = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validateYupSchemafor,
        onSubmit: forGetPass,
    });

    return (
        <>   
            <form onSubmit={formikforg.handleSubmit} className='py-48 p-10'>
                <div className="relative z-0 w-full mb-5  group" >
                    <input 
                        type="email" 
                        name="email" 
                        value={formikforg.values.email} 
                        onChange={formikforg.handleChange} 
                        onBlur={formikforg.handleBlur} 
                        id="email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
                        placeholder=" " 
                        required 
                    />
                    <label 
                        htmlFor="email" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter your email:
                    </label>
                </div>
                {formikforg.errors.email && formikforg.touched.email && 
                    <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-400-800 dark:text-red-400" role="alert">
                        {formikforg.errors.email}
                    </div>
                }
   {loding? <button type="botton" className="text-white bg-emerald-700 hover:bg-emerald-700  focus:outline-none focus:bg-emerald-700 font-medium rounded-lg text-md w-full sm:w-auto px-3 py-1 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700">
      <i className='fas fa-spinner fa-spin-pulse'></i>
    </button>: <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-700  focus:outline-none focus:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700">Send</button>
  }
  </form>
        </>
    );
}

export default ForgetPassword;
