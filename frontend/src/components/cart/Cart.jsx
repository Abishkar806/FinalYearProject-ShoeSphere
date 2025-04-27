import React from "react"

import { useState } from "react"
import { RxCross1 } from "react-icons/rx"
import { IoBagHandleOutline } from "react-icons/io5"
import { HiOutlineMinus, HiPlus } from "react-icons/hi"
import { BsCartX } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addTocart, removeFromCart } from "../../redux/actions/cart"
import { toast } from "react-toastify"

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data))
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data))
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-end z-50">
      <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[35%] h-full bg-white flex flex-col shadow-xl rounded-l-2xl overflow-y-auto animate-slideInRight">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-[#3d569a] transition-colors duration-300"
              onClick={() => setOpenCart(false)}
            >
              <RxCross1 size={24} className="text-gray-700 hover:text-white" />
            </button>
            <BsCartX size={80} className="text-[#dce5f3] mb-6" />
            <h5 className="text-xl font-semibold text-[#1a2240] mb-2">Your Cart is Empty</h5>
            <p className="text-[#334580] text-center mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => setOpenCart(false)}
              className="bg-[#3d569a] hover:bg-[#2d3a69] text-white py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center"
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white shadow-md border-b p-4 flex justify-between items-center z-20">
              <div className="flex items-center gap-2">
                <IoBagHandleOutline size={24} className="text-[#3d569a]" />
                <h1 className="text-xl font-bold text-[#1a2240]">Your Shopping Cart</h1>
              </div>
              <button
                className="p-2 hover:bg-[#f0f4fa] rounded-full transition-colors"
                onClick={() => setOpenCart(false)}
              >
                <RxCross1 size={22} className="text-[#1a2240]" />
              </button>
            </div>

            {/* Item Count */}
            <div className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] text-white font-semibold text-center py-2.5 text-sm">
              {cart.length} Item{cart.length !== 1 ? "s" : ""} in Your Cart
            </div>

            {/* Cart Items */}
            <div className="flex-grow px-4 py-6 space-y-5 overflow-y-auto">
              {cart.map((item, index) => (
                <CartSingle
                  key={index}
                  data={item}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </div>

            {/* Checkout */}
            <div className="sticky bottom-0 bg-white border-t p-5 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#334580] font-medium">Subtotal:</span>
                <span className="text-[#1a2240] text-xl font-bold">Rs.{totalPrice.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block">
                <button className="w-full bg-gradient-to-r from-[#1a2240] to-[#3d569a] text-white py-3.5 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <span>Proceed to Checkout</span>
                </button>
              </Link>
              <button
                onClick={() => setOpenCart(false)}
                className="w-full mt-3 border border-[#3d569a] text-[#3d569a] py-2 rounded-lg hover:bg-[#f0f4fa] transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty)
  const totalPrice = data.discountPrice * value

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!")
    } else {
      setValue(value + 1)
      const updateCartData = { ...data, qty: value + 1 }
      quantityChangeHandler(updateCartData)
    }
  }

  const decrement = (data) => {
    const newValue = value === 1 ? 1 : value - 1
    setValue(newValue)
    const updateCartData = { ...data, qty: newValue }
    quantityChangeHandler(updateCartData)
  }

  return (
    <div className="relative flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <img
        src={data?.images[0]?.url || "/placeholder.svg"}
        alt={data.name || "Product"}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-[#1a2240]">{data.name}</h3>
        <p className="text-sm text-[#334580] mt-1">
          Rs.{data.discountPrice.toLocaleString()} x {value}
        </p>
        <p className="text-lg text-[#3d569a] font-bold mt-1">Rs.{totalPrice.toLocaleString()}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
        <button
          className="bg-[#f0f4fa] text-[#3d569a] w-8 h-8 flex items-center justify-center hover:bg-[#dce5f3] transition-colors"
          onClick={() => decrement(data)}
        >
          <HiOutlineMinus size={16} />
        </button>
        <span className="w-8 text-center font-medium text-[#1a2240]">{value}</span>
        <button
          className="bg-[#f0f4fa] text-[#3d569a] w-8 h-8 flex items-center justify-center hover:bg-[#dce5f3] transition-colors"
          onClick={() => increment(data)}
        >
          <HiPlus size={16} />
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-[#3d569a] p-1 hover:bg-[#f0f4fa] rounded-full transition-colors"
        onClick={() => removeFromCartHandler(data)}
        title="Remove item"
      >
        <RxCross1 size={18} />
      </button>
    </div>
  )
}

export default Cart
