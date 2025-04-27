import React from "react"
import { useState, useEffect } from "react"
import { State } from "country-state-city"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"

import { FiMapPin, FiCreditCard, FiTag, FiTruck } from "react-icons/fi"

const Checkout = () => {
  const { user } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state.cart)
  const [city, setCity] = useState("")
  const [userInfo, setUserInfo] = useState(false)
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [couponCodeData, setCouponCodeData] = useState(null)
  const [discountPrice, setDiscountPrice] = useState(null)
  const navigate = useNavigate()

  // Nepal's ISO code
  const NEPAL_ISO_CODE = "NP"

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const paymentSubmit = () => {
    if (address1 === "" || address2 === "" || zipCode === "" || city === "") {
      toast.error("Please complete your delivery address!")
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country: NEPAL_ISO_CODE,
        city,
      }

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      }

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData))
      navigate("/payment")
    }
  }

  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

  // Fixed shipping cost of Rs. 100
  const shipping = 100

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = couponCode

    await axios
      .get(`${server}/coupon/get-coupon-value/${name}`)
      .then((res) => {
        const shopId = res.data.couponCode?.shopId
        const couponCodeValue = res.data.couponCode?.value
        if (res.data.couponCode !== null) {
          const isCouponValid = cart && cart.filter((item) => item.shopId === shopId)

          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop")
            setCouponCode("")
          } else {
            const eligiblePrice = isCouponValid.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)
            const discountPrice = (eligiblePrice * couponCodeValue) / 100
            setDiscountPrice(discountPrice)
            setCouponCodeData(res.data.couponCode)
            setCouponCode("")
            toast.success("Coupon applied successfully!")
          }
        }
        if (res.data.couponCode === null) {
          toast.error("Coupon code doesn't exist!")
          setCouponCode("")
        }
      })
      .catch((error) => {
        toast.error("Error applying coupon")
        console.error(error)
      })
  }

  const discountPercentenge = couponCodeData ? discountPrice : ""

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2)

  return (
    <div className="w-full bg-[#f0f4fa] min-h-screen py-8">
      <div className="w-[95%] 1000px:w-[85%] m-auto">
   
        <div className="w-full block 800px:flex gap-8 mt-8">
          <div className="w-full 800px:w-[65%]">
            <ShippingInfo
              user={user}
              city={city}
              setCity={setCity}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              address1={address1}
              setAddress1={setAddress1}
              address2={address2}
              setAddress2={setAddress2}
              zipCode={zipCode}
              setZipCode={setZipCode}
            />
          </div>
          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData
              handleSubmit={handleSubmit}
              totalPrice={totalPrice}
              shipping={shipping}
              subTotalPrice={subTotalPrice}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              discountPercentenge={discountPercentenge}
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            className="bg-[#3d569a] hover:bg-[#2d3a69] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
            onClick={paymentSubmit}
          >
            <FiCreditCard className="text-lg" />
            <span>Proceed to Payment</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const ShippingInfo = ({
  user,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  // Nepal's ISO code
  const NEPAL_ISO_CODE = "NP"

  // Get all cities/states of Nepal
  const nepalCities = State.getStatesOfCountry(NEPAL_ISO_CODE)

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-[#dce5f3]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#f0f4fa] p-2 rounded-full">
          <FiMapPin className="text-[#3d569a] text-xl" />
        </div>
        <h2 className="text-xl font-bold text-[#1a2240]">Shipping Address</h2>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#334580] font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] bg-[#f0f4fa] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
          <div>
            <label className="block text-[#334580] font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] bg-[#f0f4fa] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#334580] font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={user && user.phoneNumber}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] bg-[#f0f4fa] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
          <div>
            <label className="block text-[#334580] font-medium mb-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              placeholder="Enter your postal code"
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#334580] font-medium mb-2">Country</label>
            <input
              type="text"
              value="Nepal"
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] bg-[#f0f4fa] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
          <div>
            <label className="block text-[#334580] font-medium mb-2">City/Province</label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select your city/province</option>
              {nepalCities.map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#334580] font-medium mb-2">Address Line 1</label>
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Street address, P.O. box"
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
          <div>
            <label className="block text-[#334580] font-medium mb-2">Address Line 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Apartment, suite, unit, building, floor, etc."
              className="w-full px-4 py-3 rounded-lg border border-[#dce5f3] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
            />
          </div>
        </div>
      </form>

      {user && user.addresses && user.addresses.length > 0 && (
        <div className="mt-8 border-t border-[#dce5f3] pt-5">
          <button
            className="flex items-center gap-2 text-[#3d569a] font-medium hover:text-[#2d3a69]"
            onClick={() => setUserInfo(!userInfo)}
          >
            {userInfo ? "Hide saved addresses" : "Choose from saved addresses"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${userInfo ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {userInfo && (
            <div className="mt-4 space-y-3">
              {user.addresses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 border border-[#dce5f3] rounded-lg hover:bg-[#f0f4fa] cursor-pointer"
                  onClick={() => {
                    setAddress1(item.address1)
                    setAddress2(item.address2)
                    setZipCode(item.zipCode)
                    setCity(item.city)
                  }}
                >
                  <input type="radio" name="savedAddress" className="mt-1" />
                  <div>
                    <h3 className="font-medium text-[#1a2240]">{item.addressType}</h3>
                    <p className="text-sm text-[#334580]">
                      {item.address1}, {item.address2}, {item.city}, Nepal - {item.zipCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-[#dce5f3]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#f0f4fa] p-2 rounded-full">
          <FiTag className="text-[#3d569a] text-xl" />
        </div>
        <h2 className="text-xl font-bold text-[#1a2240]">Order Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[#334580]">Subtotal:</span>
          <span className="font-semibold text-[#1a2240]">Rs.{subTotalPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#334580]">Shipping:</span>
            <div className="bg-[#dce5f3] text-[#3d569a] text-xs px-2 py-1 rounded-full">Fixed Rate</div>
          </div>
          <span className="font-semibold text-[#1a2240]">Rs.{shipping.toFixed(2)}</span>
        </div>

        {discountPercentenge && (
          <div className="flex justify-between items-center text-green-600">
            <span>Discount:</span>
            <span className="font-semibold">- Rs.{discountPercentenge.toLocaleString()}</span>
          </div>
        )}

        <div className="border-t border-[#dce5f3] pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-[#1a2240]">Total:</span>
            <span className="text-xl font-bold text-[#1a2240]">Rs.{totalPrice}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-grow px-4 py-3 rounded-lg border border-[#dce5f3] focus:outline-none focus:ring-2 focus:ring-[#3d569a]"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#3d569a] hover:bg-[#2d3a69] text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Apply
            </button>
          </div>
        </form>

        <div className="bg-[#f0f4fa] p-4 rounded-lg mt-6">
          <div className="flex items-start gap-2">
            <FiTruck className="text-[#3d569a] mt-1 flex-shrink-0" />
            <p className="text-sm text-[#334580]">
              <span className="font-semibold">Shipping Policy:</span> We charge a flat rate of Rs.100 for delivery
              anywhere in Nepal. Orders are typically delivered within 3-5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
