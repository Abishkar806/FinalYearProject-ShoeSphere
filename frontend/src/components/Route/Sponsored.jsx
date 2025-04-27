import React from "react"
import styles from "../../styles/styles"
import Nike from "../../Assests/Nikelogo.png"
import adidas from "../../Assests/adidaslogo.png"
import converse from "../../Assests/converselogo.png"
import goldstar from "../../Assests/goldstarlogo.png"
import jordan from "../../Assests/jordanlogo.png"
import caliber from "../../Assests/caliberlogo.png"
import erke from "../../Assests/erkelogo.png"

const brands = [Nike, adidas, converse, goldstar, jordan, caliber, erke]

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-gradient-to-r from-[#f0f4fa] to-white py-12 px-6 mb-12 rounded-xl shadow-xl`}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#1a2240] uppercase tracking-wide">Our Sponsored Brands</h2>
        <div className="w-20 h-1 bg-[#3d569a] mx-auto mt-4 rounded-full" />
      </div>

      <div className="flex justify-center items-center flex-wrap gap-10">
        {brands.map((logo, index) => (
          <img
            key={index}
            src={logo || "/placeholder.svg"}
            alt={`Brand Logo ${index + 1}`}
            className="w-32 h-20 object-contain opacity-90 hover:opacity-100 transition-transform transform hover:scale-110"
          />
        ))}
      </div>
    </div>
  )
}

export default Sponsored
