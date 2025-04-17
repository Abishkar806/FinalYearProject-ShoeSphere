import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-end z-50">
      <div className="w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] h-full bg-white rounded-l-2xl shadow-2xl flex flex-col overflow-y-auto transition-all">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <AiOutlineHeart size={24} className="text-red-500" />
            <h1 className="text-xl font-bold text-gray-800">
              Wishlist ({wishlist.length})
            </h1>
          </div>
          <button
            onClick={() => setOpenWishlist(false)}
            className="p-2 bg-gray-200 rounded-full hover:bg-red-500 transition"
          >
            <RxCross1 size={24} className="text-gray-700 hover:text-white" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="p-4 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <WishlistItem
                key={index}
                data={item}
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              Your wishlist is empty
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const WishlistItem = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="relative flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300">
      {/* Remove Button */}
      <button
        onClick={() => removeFromWishlistHandler(data)}
        className="absolute top-2 left-2 text-gray-400 hover:text-red-500"
      >
        <RxCross1 size={18} />
      </button>

      {/* Image */}
      <img
        src={data.images[0]?.url}
        alt="product"
        className="w-16 h-16 object-cover rounded-lg"
      />

      {/* Details */}
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-800">{data.name}</h3>
        <p className="text-red-600 font-bold text-lg mt-1">Rs.{totalPrice}</p>
      </div>

      {/* Cart Icon */}
      <button
        className="text-gray-600 hover:text-green-500 transition"
        onClick={() => addToCartHandler(data)}
        title="Add to cart"
      >
        <BsCartPlus size={24} />
      </button>
    </div>
  );
};

export default Wishlist;
