import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CountDown from "./CountDown";
import { addTocart } from "../../redux/actions/cart";
import styles from "../../styles/styles";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [timeUp, setTimeUp] = useState(false);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
     <div className="w-full px-4 md:px-10 pt-8 pb-12 bg-white">
      <div className="bg-white/80 backdrop-blur-lg rounded-xl flex flex-col lg:flex-row p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-200 mb-10">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={data.images[0]?.url}
            alt={data.name}
            className="w-[85%] h-auto object-contain rounded-lg transform transition-all duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-4">
          <h2 className={`${styles.productTitle} text-3xl font-bold text-gray-900 mb-2`}>
            {data.name}
          </h2>

          <p className="text-gray-600 text-lg mt-3 leading-relaxed">
            {data.description}
          </p>

          {/* Price & Sales Info */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h5 className="font-bold text-2xl text-[#333] pr-3">
                Rs.{data.discountPrice}
              </h5>
              <h5 className="font-medium text-xl text-[#d55b45] pr-3 line-through">
                Rs.{data.originalPrice}
              </h5>
            </div>
            <span className="text-[17px] font-semibold text-[#44a55e] bg-[#e8f5e9] px-3 py-1 rounded-full shadow-sm">
              {data.sold_out} Sold
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="bg-[#fff5f5] p-4 rounded-lg shadow-md border border-[#d55b45] flex items-center justify-center">
            <CountDown data={data} onTimeUpChange={setTimeUp} />
          </div>

          {/* Action Buttons */}
          {!timeUp && (
            <div className="flex gap-4 mt-6">
              <Link to={`/product/${data._id}?isEvent=true`} className="w-full">
                <button className="w-full bg-[#d55b45] text-white text-lg font-bold py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-red-600 hover:scale-105">
                  See Details
                </button>
              </Link>
              <button
                className="w-full border-2 border-[#d55b45] text-[#d55b45] text-lg font-bold py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-[#d55b45] hover:text-white hover:scale-105"
                onClick={() => addToCartHandler(data)}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      
    </div>
    

    
    </>
   
  );
};

export default EventCard;
