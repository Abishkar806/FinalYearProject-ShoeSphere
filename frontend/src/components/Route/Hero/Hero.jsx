import React from "react";
import styles from "../../../styles/styles";
import hero from "../../../Assests/HeroPage.png";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <div
      className={`relative w-full h-screen flex items-center ${styles.normalFlex}`}
      style={{
        backgroundImage: `url(${hero})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 text-left px-6 md:px-12 pl-10 md:pl-20">
        <h1 className="text-5xl md:text-7xl font-extrabold capitalize mb-4 leading-tight text-[#2D2E32]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077B6] via-[#2D2E32] to-[#E63946] drop-shadow-lg">
            <Typewriter
              words={["Best Collection", "Premium Styles", "Trending Footwear"]}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-6 font-medium text-[#333333] max-w-[650px]">
          <span className="text-[#0077B6] font-bold">ShoeSphere</span> – your one-stop destination for trendy and affordable footwear. <br />
          Explore a wide range of shoes and slippers from top brands, all in one place. <br />
          Find your perfect fit and step into style today!
        </p>

        <Link to="/products" className="inline-block">
          <div className="mt-5 ml-4 md:ml-8 flex items-center gap-3 bg-[#E63946] hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/50 px-6 py-3 rounded-lg border border-white/20 hover:shadow-red-600">
            <FaShoppingBag size={24} className="text-white animate-bounce" />
            <span className="text-white font-[Poppins] font-[600] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
