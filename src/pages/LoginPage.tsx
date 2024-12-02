import { FaEyeSlash, FaEye } from "react-icons/fa"
import { useState } from "react"
import Logo from '../images/logo.png'
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import {useMutation} from "@tanstack/react-query"
import { loginRequest } from "../api/users"
import toast from "react-hot-toast"

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const setToken = useAuthStore((state) => state.setToken)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginMutation = useMutation({
    mutationFn: () => loginRequest(email, password),
    onSuccess: (response) => {
      setToken(response?.data.access, response?.data.refresh)
      toast.success("Bienvenido/a")
    },
    onError: (error) => {
      console.log(error)
      toast.error("Ocurrio un error")
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <section className="relative ">
      <img src={Logo} alt="Logo" className="absolute top-0 left-0 w-48" />
      <section className="w-1/4 mx-auto pt-48">
        <p className="font-bold text-3xl">Login</p>
        <form className="mt-10" onSubmit={handleSubmit}>
                <div className="border rounded-md overflow-hidden">
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
                  Login
                </button>
                <Link to={'/register'} className="mt-3 text-gray-500 text-xs ">¿Aun no tienes una cuenta?</Link>
              </form>
      </section>
    </section>
  )
}

export default LoginPage
