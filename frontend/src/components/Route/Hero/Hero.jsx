import React from "react"
import styles from "../../../styles/styles"
import hero from "../../../Assests/HeroPage.png"
import { Link } from "react-router-dom"
import { FaShoppingBag } from "react-icons/fa"
import { Typewriter } from "react-simple-typewriter"

const Hero = () => {
  return (
    <div
      className={`relative w-full h-screen flex items-center ${styles.normalFlex}`}
      style={{
        backgroundImage: `url(${hero || "/placeholder.svg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 text-left px-6 md:px-12 pl-10 md:pl-20">
        <h1 className="text-5xl md:text-7xl font-extrabold capitalize mb-4 leading-tight text-[#1a2240]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d569a] via-[#1a2240] to-[#6a8cca] drop-shadow-lg">
            <Typewriter
              words={["Best Collection", "Premium Styles", "Trending Footwear"]}
              loop={Number.POSITIVE_INFINITY}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-6 font-medium text-[#334580] max-w-[650px]">
          <span className="text-[#3d569a] font-bold">ShoeSphere</span> – your one-stop destination for trendy and
          affordable footwear. <br />
          Explore a wide range of shoes and slippers from top brands, all in one place. <br />
          Find your perfect fit and step into style today!
        </p>

        <Link to="/products" className="inline-block">
          <div className="mt-5 ml-4 md:ml-8 flex items-center gap-3 bg-[#3d569a] hover:bg-[#2d3a69] hover:scale-110 transition-all duration-300 shadow-lg shadow-[#3d569a]/50 px-6 py-3 rounded-lg border border-white/20 hover:shadow-[#2d3a69]">
            <FaShoppingBag size={24} className="text-white animate-bounce" />
            <span className="text-white font-[Poppins] font-[600] text-[18px]">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero
