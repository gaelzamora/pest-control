import Logo from '../images/logo.png'
import { useState } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)


  return (
    <section className="relative ">
      <img src={Logo} alt="Logo" className="absolute top-0 left-0 w-48" />
      <section className="w-1/4 mx-auto pt-48">
        <p className="font-bold text-3xl">Register to <span className='text-gray-500 font-bold'>Catch Me</span></p>
        <form className="mt-10">
                <div className="border rounded-md overflow-hidden">
                  <input 
                    type="text" 
                    placeholder='First Name'
                    className='block w-full border-b px-4 py-2 focus:outline-none'
                    required
                  />
                  <input 
                    type="text" 
                    placeholder='Last Name'
                    className='block w-full border-b px-4 py-2 focus:outline-none'
                    required
                  />
                  <input 
                    type="text" 
                    placeholder='Company Name'
                    className='block w-full border-b px-4 py-2 focus:outline-none'
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="block w-full border-b px-4 py-2 focus:outline-none"
                    required
                  />
                  <div className='relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="block w-full px-4 py-2 focus:outline-none"
                      required
                      />
                    <button
                      type='button'
                      className='absolute right-3 top-3 text-gray-500'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                </div>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white w-full rounded-md mt-5 py-3.5"                  
                  >
                  Login
                </button>
                <Link to={'/'} className="mt-3 text-gray-500 text-xs ">¿Ya tienes una cuenta?</Link>
              </form>
      </section>
    </section>
  )
}

export default RegisterPage
