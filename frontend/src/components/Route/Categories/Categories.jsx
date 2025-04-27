import React, { cloneElement } from "react"
import styles from "../../../styles/styles"
import { brandingData, shoeCategoriesData } from "../../../static/data"
import { useNavigate } from "react-router-dom"

const Categories = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.normalFlex} hidden sm:block px-6 md:px-16`}>
        <div className="my-12 w-full py-10 px-8 md:px-20 rounded-2xl shadow-lg bg-gradient-to-r from-[#f0f4fa] via-[#dce5f3] to-[#bfd0ea] flex justify-between items-center space-x-6">
          {brandingData &&
            brandingData.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 max-w-xs">
                <span className="text-[#3d569a] text-4xl">
                  {cloneElement(item.icon, {
                    strokeWidth: 2,
                    strokeMiterlimit: 10,
                    strokeLinecap: "round",
                  })}
                </span>
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-[#1a2240]">{item.title}</h3>
                  <p className="text-sm md:text-base text-[#334580]">{item.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className={`${styles.section} py-12 px-6 md:px-20 rounded-2xl mb-12 bg-[#f0f4fa] shadow-lg`} id="Categories">
        <h2 className="text-4xl font-extrabold text-[#1a2240] mb-10 text-center uppercase tracking-wide">
          Popular Shoe Categories
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {shoeCategoriesData &&
            shoeCategoriesData.slice(0, 10).map((i) => {
              const handleSubmit = (item) => {
                navigate(`/products?category=${item.title}`)
                window.location.reload()
              }

              return (
                <div
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                  className="cursor-pointer p-5 bg-white rounded-xl shadow-md hover:shadow-xl hover:bg-[#dce5f3] transition-all duration-300 ease-in-out flex flex-col items-center justify-between space-y-3 hover:scale-[1.03]"
                >
                  <img
                    src={i.image_Url || "/placeholder.svg"}
                    alt={i.title}
                    className="w-20 h-20 object-contain transition-transform duration-300 hover:scale-110"
                  />
                  <h5 className="text-lg font-semibold text-[#3d569a] text-center leading-tight">{i.title}</h5>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Categories
