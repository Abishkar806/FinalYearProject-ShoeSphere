"use client"

import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getAllProductsShop } from "../../redux/actions/product"
import { server } from "../../server"
import styles from "../../styles/styles"
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist"
import { addTocart } from "../../redux/actions/cart"
import { toast } from "react-toastify"
import Ratings from "./Ratings"
import axios from "axios"

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist)
  const { cart } = useSelector((state) => state.cart)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const { products } = useSelector((state) => state.products)
  const [count, setCount] = useState(1)
  const [click, setClick] = useState(false)
  const [select, setSelect] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id))
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [data, wishlist, dispatch])

  const incrementCount = () => {
    setCount(count + 1)
  }

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  const addToWishlistHandler = (data) => {
    setClick(!click)
    dispatch(addToWishlist(data))
  }

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id)
    if (isItemExists) {
      toast.error("Item already in cart!")
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!")
      } else {
        const cartData = { ...data, qty: count }
        dispatch(addTocart(cartData))
        toast.success("Item added to cart successfully!")
      }
    }
  }

  const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0)

  const totalRatings =
    products &&
    products.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0), 0)

  const avg = totalRatings / totalReviewsLength || 0
  const averageRating = avg.toFixed(2)

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id
      const userId = user._id
      const sellerId = data.shop._id
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    } else {
      toast.error("Please login to create a conversation")
    }
  }

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/* Product Images Section */}
              <div className="w-full 800px:w-[50%]">
                <div className="bg-[#f0f4fa] p-4 rounded-lg mb-4">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt={data.name}
                    className="w-[80%] mx-auto object-contain"
                  />
                </div>
                <div className="w-full flex flex-wrap gap-2">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={i?.public_id || index}
                        className={`cursor-pointer border-2 ${
                          select === index ? "border-[#3d569a] shadow-md" : "border-[#dce5f3]"
                        } rounded-md overflow-hidden transition-all hover:shadow-md`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={`${i?.url}`}
                          alt={`Product ${index + 1}`}
                          className="h-[100px] w-[100px] object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full 800px:w-[50%] pt-5 800px:pl-8">
                <h1 className="text-2xl font-bold text-[#1a2240] mb-2">{data.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex">
                    <Ratings rating={data?.ratings} />
                  </div>
                  <span className="text-[#334580]">({data.reviews?.length || 0} Reviews)</span>
                  <span className="text-[#3d569a] bg-[#f0f4fa] px-2 py-1 rounded-full text-xs font-medium">
                    {data.sold_out || 0} Sold
                  </span>
                </div>

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
                  <p className="text-[#334580] mb-4">{data.description.substring(0, 200)}...</p>

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

                <div className="flex gap-4 mb-8">
                  <button
                    className="flex-1 bg-[#3d569a] hover:bg-[#2d3a69] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors shadow-md"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span>Add to Cart</span>
                    <AiOutlineShoppingCart className="ml-2 text-xl" />
                  </button>

                  <button
                    className="flex-1 border border-[#3d569a] text-[#3d569a] hover:bg-[#f0f4fa] font-semibold py-3 px-4 rounded-lg transition-colors"
                    onClick={() => navigate("/checkout")}
                  >
                    Buy Now
                  </button>
                </div>

                {/* Shop Information */}
                <div className="flex items-center gap-4 p-4 border border-[#dce5f3] rounded-lg bg-[#f0f4fa]">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}` || "/placeholder.svg"}
                      alt="Shop Logo"
                      className="w-[50px] h-[50px] rounded-full border-2 border-white shadow-sm"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className="font-semibold text-[#1a2240]">{data.shop.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1">
                      <span className="text-[#334580] text-sm">{averageRating}/5</span>
                      <span className="text-[#334580] text-sm">•</span>
                      <span className="text-[#3d569a] text-sm font-medium">View Shop</span>
                    </div>
                  </div>

                  <button
                    className="bg-[#3d569a] hover:bg-[#2d3a69] text-white py-2 px-4 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    onClick={handleMessageSubmit}
                  >
                    <AiOutlineMessage />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />

          <br />
          <br />
        </div>
      ) : null}
    </div>
  )
}

const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
  const [active, setActive] = useState(1)

  return (
    <div className="bg-[#f0f4fa] px-6 py-6 rounded-xl shadow-sm mt-8">
      {/* Tabs */}
      <div className="w-full flex flex-wrap gap-4 border-b border-[#dce5f3] pb-4">
        <div className="relative">
          <button
            className={`text-lg font-semibold px-4 py-2 rounded-t-lg transition-colors ${
              active === 1 ? "text-[#1a2240] bg-white shadow-sm" : "text-[#334580] hover:text-[#3d569a]"
            }`}
            onClick={() => setActive(1)}
          >
            Product Details
          </button>
          {active === 1 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3d569a] rounded-full" />}
        </div>

        <div className="relative">
          <button
            className={`text-lg font-semibold px-4 py-2 rounded-t-lg transition-colors ${
              active === 2 ? "text-[#1a2240] bg-white shadow-sm" : "text-[#334580] hover:text-[#3d569a]"
            }`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </button>
          {active === 2 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3d569a] rounded-full" />}
        </div>

        <div className="relative">
          <button
            className={`text-lg font-semibold px-4 py-2 rounded-t-lg transition-colors ${
              active === 3 ? "text-[#1a2240] bg-white shadow-sm" : "text-[#334580] hover:text-[#3d569a]"
            }`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </button>
          {active === 3 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3d569a] rounded-full" />}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg mt-4 min-h-[300px]">
        {/* Product Details Tab */}
        {active === 1 && (
          <div className="py-2 text-[#334580] leading-relaxed whitespace-pre-line">{data.description}</div>
        )}

        {/* Product Reviews Tab */}
        {active === 2 && (
          <div className="w-full min-h-[40vh] flex flex-col py-3 overflow-y-auto">
            {data && data.reviews.length > 0 ? (
              data.reviews.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 border-b border-[#f0f4fa] last:border-0">
                  <img
                    src={`${item.user.avatar?.url}` || "/placeholder.svg"}
                    alt="User"
                    className="w-[50px] h-[50px] rounded-full border border-[#dce5f3]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-[#1a2240]">{item.user.name}</h3>
                      <Ratings rating={item.rating} />
                      <span className="text-[#334580] text-sm">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[#334580]">{item.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-[#334580]">
                <div className="bg-[#f0f4fa] p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-[#3d569a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#1a2240] mb-1">No Reviews Yet</h3>
                <p>Be the first to review this product!</p>
              </div>
            )}
          </div>
        )}

        {/* Seller Information Tab */}
        {active === 3 && (
          <div className="w-full block 800px:flex gap-8">
            <div className="w-full 800px:w-[50%]">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`${data?.shop?.avatar?.url}` || "/placeholder.svg"}
                    className="w-[80px] h-[80px] rounded-full border-2 border-[#dce5f3]"
                    alt="Shop Logo"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-[#1a2240]">{data.shop.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[#334580]">{averageRating}/5</span>
                      <div className="flex">
                        <Ratings rating={Number.parseFloat(averageRating)} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="bg-[#f0f4fa] p-4 rounded-lg">
                <p className="text-[#334580]">{data.shop.description}</p>
              </div>
            </div>

            <div className="w-full 800px:w-[50%] mt-6 800px:mt-0 800px:border-l 800px:pl-8 border-[#dce5f3]">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-[#334580]">Joined on:</h5>
                  <span className="font-medium text-[#1a2240]">
                    {new Date(data.shop?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <h5 className="text-[#334580]">Total Products:</h5>
                  <span className="font-medium text-[#1a2240]">{products && products.length}</span>
                </div>

                <div className="flex justify-between items-center">
                  <h5 className="text-[#334580]">Total Reviews:</h5>
                  <span className="font-medium text-[#1a2240]">{totalReviewsLength}</span>
                </div>

                <Link to={`/shop/preview/${data.shop._id}`}>
                  <button className="w-full bg-[#3d569a] hover:bg-[#2d3a69] text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-4">
                    Visit Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
