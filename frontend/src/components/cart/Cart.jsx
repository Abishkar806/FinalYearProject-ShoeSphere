import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-end z-50">
      <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[35%] h-full bg-white flex flex-col shadow-xl rounded-l-2xl overflow-y-auto">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center relative">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-red-500 transition"
              onClick={() => setOpenCart(false)}
            >
              <RxCross1 size={24} className="text-gray-700 hover:text-white" />
            </button>
            <h5 className="text-lg text-gray-500">Cart is empty!</h5>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white shadow-md border-b p-4 flex justify-between items-center z-20">
              <h1 className="text-xl font-bold uppercase tracking-wide">Your Shopping Cart</h1>
              <RxCross1
                size={26}
                className="cursor-pointer hover:text-gray-500 transition"
                onClick={() => setOpenCart(false)}
              />
            </div>

            {/* Item Count */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold text-center py-2 text-sm">
              {cart.length} Item{cart.length !== 1 ? "s" : ""}
            </div>

            {/* Cart Items */}
            <div className="flex-grow px-4 py-4 space-y-4 overflow-y-auto">
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
            <div className="sticky bottom-0 bg-white border-t p-4 shadow-md">
              <Link to="/checkout">
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition">
                  Checkout Now (Rs.{totalPrice})
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    const newValue = value === 1 ? 1 : value - 1;
    setValue(newValue);
    const updateCartData = { ...data, qty: newValue };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="relative flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border hover:shadow-lg transition duration-300">
      {/* Quantity Controls */}
      <div className="flex flex-col items-center">
        <button
          className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-600 transition"
          onClick={() => increment(data)}
        >
          <HiPlus size={16} />
        </button>
        <span className="py-1 font-medium text-sm">{value}</span>
        <button
          className="bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-400 transition"
          onClick={() => decrement(data)}
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={data?.images[0]?.url}
        alt="product"
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-800">{data.name}</h3>
        <p className="text-sm text-gray-600">Rs.{data.discountPrice} x {value}</p>
        <p className="text-lg text-red-600 font-bold">Rs.{totalPrice}</p>
      </div>

      {/* Remove Button */}
      <button
        className="text-gray-500 hover:text-red-500 transition"
        onClick={() => removeFromCartHandler(data)}
      >
        <RxCross1 size={20} />
      </button>
    </div>
  );
};

export default Cart;
