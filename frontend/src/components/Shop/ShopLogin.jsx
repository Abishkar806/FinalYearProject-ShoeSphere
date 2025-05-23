import React from "react"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import styles from "../../styles/styles"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"

const ShopLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success("Login Success!")
        navigate("/dashboard")
        window.location.reload(true)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f4fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1a2240]">Login to your shop</h2>
        <p className="mt-2 text-center text-sm text-[#334580]">Access your seller dashboard and manage your products</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#334580]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3d569a] focus:border-[#3d569a] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#334580]">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3d569a] focus:border-[#3d569a] sm:text-sm"
                  placeholder="Enter your password"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer text-[#334580]"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer text-[#334580]"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-[#3d569a] focus:ring-[#3d569a] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#334580]">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-[#3d569a] hover:text-[#2d3a69] transition-colors duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3d569a] hover:bg-[#2d3a69] transition-colors duration-200 shadow-sm"
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4 className="text-[#334580]">Don't have a shop account?</h4>
              <Link
                to="/shop-create"
                className="text-[#3d569a] hover:text-[#2d3a69] pl-2 font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShopLogin
