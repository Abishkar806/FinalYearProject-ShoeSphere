import React from "react"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import styles from "../../styles/styles"
import { Link } from "react-router-dom"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"
import { RxAvatar } from "react-icons/rx"

const ShopCreate = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [address, setAddress] = useState("")
  const [avatar, setAvatar] = useState()
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      toast.success(data.message)
      setName("")
      setEmail("")
      setPassword("")
      setAvatar("")
      setZipCode("")
      setAddress("")
      setPhoneNumber("")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred")
    }
  }

  const handleFileInputChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f4fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1a2240]">Register as a seller</h2>
        <p className="mt-2 text-center text-sm text-[#334580]">Create your shop and start selling your products</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#334580]">
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3d569a] focus:border-[#3d569a] sm:text-sm"
                    placeholder="Enter your shop name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#334580]">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phone-number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3d569a] focus:border-[#3d569a] sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

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
              <label htmlFor="address" className="block text-sm font-medium text-[#334580]">
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3d569a] focus:border-[#3d569a] sm:text-sm"
                  placeholder="Enter your shop address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="zipcode" className="block text-sm font-medium text-[#334580]">
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zipcode"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3d569a] focus:border-[#3d569a] sm:text-sm"
                    placeholder="Enter your zip code"
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
                    placeholder="Create a password"
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
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-[#334580]">
                Shop Logo
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-[#f0f4fa]">
                  {avatar ? (
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-12 w-12 text-[#3d569a]" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#334580] bg-white hover:bg-[#f0f4fa] transition-colors duration-200"
                >
                  <span>Upload a logo</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3d569a] hover:bg-[#2d3a69] transition-colors duration-200 shadow-sm"
              >
                Create Shop
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4 className="text-[#334580]">Already have a shop account?</h4>
              <Link
                to="/shop-login"
                className="text-[#3d569a] hover:text-[#2d3a69] pl-2 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShopCreate
