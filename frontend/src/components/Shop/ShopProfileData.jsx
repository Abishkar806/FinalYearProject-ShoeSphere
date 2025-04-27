
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getAllProductsShop } from "../../redux/actions/product"
import ProductCard from "../Route/ProductCard/ProductCard"
import Ratings from "../Products/Ratings"
import { getAllEventsShop } from "../../redux/actions/event"
import { FiPackage, FiCalendar, FiStar, FiGrid } from "react-icons/fi"

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products)
  const { events } = useSelector((state) => state.events)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([dispatch(getAllProductsShop(id)), dispatch(getAllEventsShop(id))]).then(() => {
      setIsLoading(false)
    })
  }, [dispatch, id])

  const [active, setActive] = useState(1)

  const allReviews = products && products.flatMap((product) => product.reviews)

  // Tab configuration
  const tabs = [
    { id: 1, name: "Shop Products", icon: <FiPackage /> },
    { id: 2, name: "Running Events", icon: <FiCalendar /> },
    { id: 3, name: "Shop Reviews", icon: <FiStar /> },
  ]

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-[#dce5f3] overflow-hidden p-6">
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row w-full items-center justify-between mb-6 border-b border-[#dce5f3] pb-4">
        <div className="w-full flex flex-wrap gap-2 mb-4 sm:mb-0">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex items-center" onClick={() => setActive(tab.id)}>
              <button
                className={`flex items-center gap-2 font-semibold text-lg px-4 py-2 rounded-lg transition-all ${
                  active === tab.id ? "bg-[#1a2240] text-white shadow-md" : "text-[#334580] hover:bg-[#f0f4fa]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                {tab.id === 1 && products && (
                  <span
                    className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                      active === tab.id ? "bg-white/20" : "bg-[#1a2240] text-white"
                    }`}
                  >
                    {products.length}
                  </span>
                )}
                {tab.id === 2 && events && (
                  <span
                    className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                      active === tab.id ? "bg-white/20" : "bg-[#1a2240] text-white"
                    }`}
                  >
                    {events.length}
                  </span>
                )}
                {tab.id === 3 && allReviews && (
                  <span
                    className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                      active === tab.id ? "bg-white/20" : "bg-[#1a2240] text-white"
                    }`}
                  >
                    {allReviews.length}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        <div>
          {isOwner && (
           <Link to="/dashboard">
           <div className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] text-white px-9 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center">
             <FiGrid className="mr-2" />
             <span>Go Dashboard</span>
           </div>
         </Link>
         
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-[#dce5f3] border-t-[#1a2240] rounded-full animate-spin"></div>
          <p className="mt-4 text-[#334580] font-medium">Loading shop data...</p>
        </div>
      ) : (
        <>
          {/* Products Tab */}
          {active === 1 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
              {products && products.length > 0 ? (
                products.map((i, index) => (
                  <div key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
                    <ProductCard data={i} isShop={true} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-[#f0f4fa] rounded-full flex items-center justify-center mb-4">
                    <FiPackage className="text-[#3d569a] text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a2240] mb-2">No Products Available</h3>
                  <p className="text-[#334580]">This shop hasn't added any products yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Events Tab */}
          {active === 2 && (
            <div className="w-full">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                {events && events.length > 0 ? (
                  events.map((i, index) => (
                    <div key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
                      <ProductCard data={i} isShop={true} isEvent={true} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-[#f0f4fa] rounded-full flex items-center justify-center mb-4">
                      <FiCalendar className="text-[#3d569a] text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1a2240] mb-2">No Events Available</h3>
                    <p className="text-[#334580]">This shop doesn't have any running events at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {active === 3 && (
            <div className="w-full">
              {allReviews && allReviews.length > 0 ? (
                <div className="space-y-6">
                  {allReviews.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex bg-[#f8fafd] rounded-lg p-4 border border-[#dce5f3] hover:shadow-md transition-all"
                    >
                      <img
                        src={`${item.user.avatar?.url || "/placeholder.svg?height=100&width=100&query=user"}`}
                        className="w-[60px] h-[60px] rounded-full object-cover border-2 border-[#dce5f3]"
                        alt={item.user.name}
                      />
                      <div className="pl-4 flex-1">
                        <div className="flex w-full items-center justify-between flex-wrap gap-2">
                          <h1 className="font-semibold text-[#1a2240]">{item.user.name}</h1>
                          <div className="flex">
                            <Ratings rating={item.rating} />
                          </div>
                        </div>
                        <p className="font-medium text-[#334580] mt-2 bg-white p-3 rounded-lg border border-[#dce5f3]">
                          {item?.comment}
                        </p>
                        <p className="text-[#334580] text-sm mt-2">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-[#f0f4fa] rounded-full flex items-center justify-center mb-4">
                    <FiStar className="text-[#3d569a] text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a2240] mb-2">No Reviews Yet</h3>
                  <p className="text-[#334580]">This shop hasn't received any reviews yet.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ShopProfileData
