"use client"

import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addTocart } from "../../../redux/actions/cart"
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist"

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart)
  const { wishlist } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [click, setClick] = useState(false)

  const handleMessageSubmit = () => {}

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const incrementCount = () => {
    setCount(count + 1)
  }

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id)
    if (isItemExists) {
      toast.error("Item already in cart!")
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!")
      } else {
        const cartData = { ...data, qty: count }
        dispatch(addTocart(cartData))
        toast.success("Item added to cart successfully!")
      }
    }
  }

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [wishlist, data._id])

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  const addToWishlistHandler = (data) => {
    setClick(!click)
    dispatch(addToWishlist(data))
  }

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-xl shadow-xl relative p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-50 bg-[#f0f4fa] hover:bg-[#dce5f3] p-2 rounded-full transition-colors"
            >
              <RxCross1 size={20} className="text-[#1a2240]" />
            </button>

            <div className="block w-full 800px:flex gap-6">
              {/* Left Section - Product Image & Shop Info */}
              <div className="w-full 800px:w-[50%]">
                <div className="bg-[#f0f4fa] p-4 rounded-lg mb-4">
                  <img
                    src={`${data.images && data.images[0]?.url}` || "/placeholder.svg"}
                    alt={data.name}
                    className="w-full h-auto object-contain rounded-md"
                  />
                </div>

                <div className="flex items-center p-3 border border-[#dce5f3] rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center w-full">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden mr-3 border border-[#dce5f3]">
                      <img
                        src={`${data.shop?.avatar?.url || data.images?.[0]?.url}` || "/placeholder.svg"}
                        alt={data.shop?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a2240]">{data.shop?.name}</h3>
                      <div className="flex items-center">
                        <span className="text-[#334580] text-sm">{data?.ratings || 0} Ratings</span>
                        <span className="mx-2 text-[#dce5f3]">•</span>
                        <span className="text-[#3d569a] text-sm font-medium">View Shop</span>
                      </div>
                    </div>
                  </Link>
                </div>

                <button
                  className="w-full mt-4 bg-[#f0f4fa] hover:bg-[#dce5f3] text-[#3d569a] font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                  onClick={handleMessageSubmit}
                >
                  <span>Send Message</span>
                  <AiOutlineMessage className="ml-2" />
                </button>

                <div className="mt-4 bg-[#f0f4fa] py-2 px-4 rounded-lg inline-block">
                  <span className="text-[#3d569a] font-medium">{data.sold_out || 0} Sold</span>
                </div>
              </div>

              {/* Right Section - Product Details */}
              <div className="w-full 800px:w-[50%] pt-5 800px:pt-0">
                <h1 className="text-2xl font-bold text-[#1a2240] mb-2">{data.name}</h1>
                <p className="text-[#334580] mb-4">{data.description}</p>

                <div className="flex items-center gap-3 mb-6">
                  <h4 className="text-2xl font-bold text-[#1a2240]">Rs.{data.discountPrice}</h4>
                  {data.originalPrice && (
                    <h3 className="text-lg text-[#d55b45] line-through">Rs.{data.originalPrice}</h3>
                  )}
                  {data.originalPrice && (
                    <span className="bg-[#f0f4fa] text-[#3d569a] text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="border-t border-b border-[#dce5f3] py-4 my-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-[#334580] mr-4">Quantity:</span>
                      <div className="flex items-center border border-[#dce5f3] rounded-lg overflow-hidden">
                        <button
                          className="bg-[#f0f4fa] hover:bg-[#dce5f3] text-[#1a2240] font-bold px-4 py-2 transition-colors"
                          onClick={decrementCount}
                        >
                          -
                        </button>
                        <span className="bg-white text-[#1a2240] font-medium px-6 py-2">{count}</span>
                        <button
                          className="bg-[#f0f4fa] hover:bg-[#dce5f3] text-[#1a2240] font-bold px-4 py-2 transition-colors"
                          onClick={incrementCount}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="p-2 hover:bg-[#f0f4fa] rounded-full transition-colors"
                      title={click ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer text-red-500"
                          onClick={() => removeFromWishlistHandler(data)}
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer text-[#3d569a]"
                          onClick={() => addToWishlistHandler(data)}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    className="w-full bg-[#3d569a] hover:bg-[#2d3a69] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors shadow-md"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span>Add to Cart</span>
                    <AiOutlineShoppingCart className="ml-2 text-xl" />
                  </button>

                  <button
                    className="w-full border border-[#3d569a] text-[#3d569a] hover:bg-[#f0f4fa] font-semibold py-3 px-4 rounded-lg transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Product Details */}
                <div className="mt-6">
                  <h3 className="font-semibold text-[#1a2240] mb-2">Product Details:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-[#334580]">Category:</span>
                      <span className="ml-2 text-[#1a2240] font-medium">{data.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#334580]">Stock:</span>
                      <span className="ml-2 text-[#1a2240] font-medium">{data.stock} items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProductDetailsCard
