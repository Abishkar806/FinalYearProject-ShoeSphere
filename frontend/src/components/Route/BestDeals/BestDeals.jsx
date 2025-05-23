import React from "react"
import { useEffect, useState } from "react"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"
import axios from "axios"
import { server } from "../../../server" // ✅ Ensure this points to your API base URL

const BestDeals = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchTopDeals = async () => {
      try {
        const response = await axios.get(`${server}/product/get-all-products`)
        const sorted = response.data.products.sort((a, b) => b.sold_out - a.sold_out)
        const topFive = sorted.slice(0, 5)
        setData(topFive)
      } catch (error) {
        console.error("Error fetching best deals:", error)
      }
    }

    fetchTopDeals()
  }, [])

  return (
    <div className="w-full bg-gradient-to-b from-white to-[#f0f4fa] py-14">
      <div className={`${styles.section}`}>
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2240] tracking-wide uppercase drop-shadow-sm">
            Best Deals
          </h1>
          <p className="text-base md:text-lg text-[#334580] mt-3">Top-selling products handpicked just for you</p>
          <div className="w-20 h-1 bg-[#3d569a] mx-auto mt-4 rounded-full" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-2">
          {data.length > 0 ? (
            data.map((product) => <ProductCard key={product._id} data={product} />)
          ) : (
            <div className="col-span-full flex justify-center items-center py-10">
              <p className="text-[#334580] text-lg">Loading best deals...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BestDeals
