import { FaEyeSlash, FaEye } from "react-icons/fa"
import { useState } from "react"
import Logo from '../images/logo.png'
import { Link, useNavigate } from "react-router-dom"
import {useMutation} from "@tanstack/react-query"
import { registerTechniqueRequest } from "../api/users"
import toast from "react-hot-toast"

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const registerTechniqueMutation = useMutation({
    mutationFn: () => registerTechniqueRequest(email, firstName, lastName, password),
      onSuccess: () => {
        toast.success("Register successful !")
        navigate("/")
      },
      onError: (error) => {
        console.log("Error: ", error)
      }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerTechniqueMutation.mutate()
  }

  return (
    <section className="relative ">
      <img src={Logo} alt="Logo" className="absolute top-0 left-0 w-48" />
      <section className="w-1/4 mx-auto pt-48">
        <p className="font-bold text-3xl">Register</p>
        <form className="mt-10" onSubmit={handleSubmit}>
                <div className="border rounded-md overflow-hidden">
                <input
                    type="text"
                    placeholder="First name"
                    className="block w-full border-b px-4 py-2 focus:outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                <input
                  type="text"
                  placeholder="Last name"
                  className="block w-full border-b px-4 py-2 focus:outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                /> 
                  <input
                    type="email"
                    placeholder="Email"
                    className="block w-full border-b px-4 py-2 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className='relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="block w-full px-4 py-2 focus:outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  Register
                </button>
                <Link to={'/'} className="mt-3 text-gray-500 text-xs ">¿Ya tienes una cuenta?</Link>
              </form>
      </section>
    </section>
  )
}

export default RegisterPage
