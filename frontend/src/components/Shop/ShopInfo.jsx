"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { server } from "../../server"
import Loader from "../Layout/Loader"
import { useDispatch, useSelector } from "react-redux"
import { getAllProductsShop } from "../../redux/actions/product"
import {
  FiEdit,
  FiLogOut,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiStar,
  FiCalendar,
  FiTrendingUp,
  FiCheck,
} from "react-icons/fi"

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({})
  const { products } = useSelector((state) => state.products)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsShop(id))
    setIsLoading(true)
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [dispatch, id])

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    })
    window.location.reload()
  }

  const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0)

  const totalRatings =
    products &&
    products.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0), 0)

  const averageRating = totalRatings / totalReviewsLength || 0

  // Calculate shop metrics
  const totalSales = products && products.reduce((acc, product) => acc + (product.sold_out || 0), 0)

  // Check if shop is verified (this would typically come from your API)
  const isVerified = data.isVerified || true

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
          {/* Shop Header with Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-[#1a2240] to-[#3d569a] overflow-hidden">
            {/* Cover Image - You can add this field to your shop data */}
            {data.coverImage && (
              <img
                src={data.coverImage.url || "/placeholder.svg"}
                alt="Shop Cover"
                className="w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2240] to-transparent"></div>
          </div>

          {/* Shop Profile Section */}
          <div className="relative px-6 pt-0 pb-6 -mt-16">
            <div className="flex flex-col items-center">
              {/* Avatar with Verification Badge */}
              <div className="relative">
                <div className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                  <img
                    src={data.avatar?.url || "/placeholder.svg?height=120&width=120&query=shop"}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isVerified && (
                  <div
                    className="absolute bottom-4 right-0 bg-blue-500 rounded-full p-1 border-2 border-white"
                    title="Verified Shop"
                  >
                    <FiCheck className="text-white text-sm" />
                  </div>
                )}
              </div>

              {/* Shop Name and Rating */}
              <h1 className="text-2xl font-bold mb-2 text-[#1a2240]">{data.name}</h1>
              <div className="flex items-center gap-2 bg-[#f0f4fa] px-3 py-1 rounded-full mb-4">
                <FiStar className="text-yellow-500" />
                <span className="font-medium text-[#1a2240]">{averageRating.toFixed(1)}/5</span>
                <span className="text-sm text-[#334580]">({totalReviewsLength} reviews)</span>
              </div>
            </div>
          </div>

          {/* Shop Stats */}
          <div className="grid grid-cols-2 gap-2 px-6 mb-6">
            <div className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] rounded-lg p-3 text-white flex items-center">
              <div className="p-2 bg-white/20 rounded-full mr-3">
                <FiShoppingBag />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-100">Products</p>
                <p className="text-xl font-bold">{products?.length || 0}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#3d569a] to-[#4b6cb7] rounded-lg p-3 text-white flex items-center">
              <div className="p-2 bg-white/20 rounded-full mr-3">
                <FiTrendingUp />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-100">Sales</p>
                <p className="text-xl font-bold">{totalSales || 0}</p>
              </div>
            </div>
          </div>

          {/* Shop Description */}
          <div className="px-6 py-4 border-t border-[#dce5f3]">
            <h2 className="text-lg font-semibold text-[#1a2240] mb-2">About the Shop</h2>
            <p className="text-[#334580] leading-relaxed">
              {data.description || "This shop has not added a description yet."}
            </p>
          </div>

          {/* Shop Details */}
          <div className="px-6 py-4 bg-[#f8fafd]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f0f4fa] rounded-full">
                  <FiMapPin className="text-[#3d569a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2240]">Address</h3>
                  <p className="text-[#334580]">{data.address || "No address provided"}</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f0f4fa] rounded-full">
                  <FiPhone className="text-[#3d569a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2240]">Phone Number</h3>
                  <p className="text-[#334580]">{data.phoneNumber || "No phone provided"}</p>
                </div>
              </div>

              {/* Total Products */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f0f4fa] rounded-full">
                  <FiShoppingBag className="text-[#3d569a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2240]">Total Products</h3>
                  <p className="text-[#334580]">{products && products.length}</p>
                </div>
              </div>

              {/* Joined On */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f0f4fa] rounded-full">
                  <FiCalendar className="text-[#3d569a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2240]">Joined On</h3>
                  <p className="text-[#334580]">
                    {data?.createdAt
                      ? new Date(data.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="px-6 py-4 bg-[#f8fafd] border-t border-[#dce5f3]">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/settings" className="flex-1">
                  <button
                    className="w-full bg-gradient-to-r from-[#1a2240] to-[#3d569a] hover:from-[#15193a] hover:to-[#2d4175] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    aria-label="Edit Shop"
                  >
                    <FiEdit className="text-lg" />
                    <span>Edit Shop</span>
                  </button>
                </Link>
                <button
                  className="flex-1 border-2 border-[#3d569a] text-[#3d569a] hover:bg-[#f0f4fa] font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={logoutHandler}
                  aria-label="Log Out"
                >
                  <FiLogOut className="text-lg" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ShopInfo
