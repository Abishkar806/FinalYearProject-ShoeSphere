import React from "react"
import { useState } from "react"
import { AiOutlineGift } from "react-icons/ai"
import { MdOutlineLocalOffer } from "react-icons/md"
import { FiPackage, FiShoppingBag, FiMenu } from "react-icons/fi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BiMessageSquareDetail } from "react-icons/bi"
import logo from "../../../Assests/logo.png"

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      title: "Coupons",
      icon: <AiOutlineGift size={22} />,
      link: "/dashboard/cupouns",
    },
    {
      title: "Events",
      icon: <MdOutlineLocalOffer size={22} />,
      link: "/dashboard-events",
    },
    {
      title: "Products",
      icon: <FiShoppingBag size={22} />,
      link: "/dashboard-products",
    },
    {
      title: "Orders",
      icon: <FiPackage size={22} />,
      link: "/dashboard-orders",
    },
    {
      title: "Messages",
      icon: <BiMessageSquareDetail size={22} />,
      link: "/dashboard-messages",
    },
  ]

  return (
    <div className="w-full h-[80px] bg-white shadow-md sticky top-0 left-0 z-30 px-4 lg:px-8">
      <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto">
        {/* Logo */}
        <div>
          <Link to="/dashboard" className="flex items-center">
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo"
              className="w-[120px] h-auto object-contain drop-shadow-md"
            />
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <div className="hidden 800px:flex items-center">
          <div className="flex items-center mr-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex flex-col items-center mx-4 text-[#334580] hover:text-[#3d569a] transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg group-hover:bg-[#f0f4fa] transition-colors duration-200">
                  {item.icon}
                </div>
                <span className="text-xs mt-1 font-medium">{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Shop Profile Link */}
          <Link
            to={`/shop/${seller._id}`}
            className="flex items-center gap-2 ml-4 px-4 py-2 rounded-lg hover:bg-[#f0f4fa] transition-colors duration-200"
          >
            <div className="relative">
              <img
                src={seller?.avatar?.url || "/placeholder.svg"}
                alt={seller?.name || "Shop"}
                className="w-[45px] h-[45px] rounded-full object-cover border-2 border-[#3d569a]"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden xl:block">
              <p className="text-sm font-semibold text-[#1a2240]">{seller?.name || "Shop Name"}</p>
              <p className="text-xs text-[#334580]">View Shop</p>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center 800px:hidden">
          <Link to={`/shop/${seller._id}`} className="mr-4 relative">
            <img
              src={seller?.avatar?.url || "/placeholder.svg"}
              alt={seller?.name || "Shop"}
              className="w-[40px] h-[40px] rounded-full object-cover border-2 border-[#3d569a]"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-[#f0f4fa] text-[#3d569a]"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg z-40 border-t border-gray-100 800px:hidden">
          <div className="flex flex-col py-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center px-6 py-3 hover:bg-[#f0f4fa]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="p-2 rounded-lg bg-[#f0f4fa] text-[#3d569a]">{item.icon}</div>
                <span className="ml-3 text-[#1a2240] font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardHeader
