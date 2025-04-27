import React from "react"
import { useState } from "react"
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { MdOutlineLocalOffer } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { VscNewFile } from "react-icons/vsc"
import { CiMoneyBill, CiSettings } from "react-icons/ci"
import { Link } from "react-router-dom"
import { BiMessageSquareDetail } from "react-icons/bi"
import { HiOutlineReceiptRefund } from "react-icons/hi"

const DashboardSideBar = ({ active }) => {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: <RxDashboard size={22} />,
      link: "/dashboard",
    },
    {
      id: 2,
      title: "All Orders",
      icon: <FiShoppingBag size={22} />,
      link: "/dashboard-orders",
    },
    {
      id: 3,
      title: "All Products",
      icon: <FiPackage size={22} />,
      link: "/dashboard-products",
    },
    {
      id: 4,
      title: "Create Product",
      icon: <AiOutlineFolderAdd size={22} />,
      link: "/dashboard-create-product",
    },
    {
      id: 5,
      title: "All Events",
      icon: <MdOutlineLocalOffer size={22} />,
      link: "/dashboard-events",
    },
    {
      id: 6,
      title: "Create Event",
      icon: <VscNewFile size={22} />,
      link: "/dashboard-create-event",
    },
    {
      id: 7,
      title: "Withdraw Money",
      icon: <CiMoneyBill size={22} />,
      link: "/dashboard-withdraw-money",
    },
    {
      id: 8,
      title: "Shop Inbox",
      icon: <BiMessageSquareDetail size={22} />,
      link: "/dashboard-messages",
    },
    {
      id: 9,
      title: "Discount Codes",
      icon: <AiOutlineGift size={22} />,
      link: "/dashboard-coupouns",
    },
    {
      id: 10,
      title: "Refunds",
      icon: <HiOutlineReceiptRefund size={22} />,
      link: "/dashboard-refunds",
    },
    {
      id: 11,
      title: "Settings",
      icon: <CiSettings size={22} />,
      link: "/settings",
    },
  ]

  return (
    <div className="w-full h-[90vh] bg-white shadow-md overflow-y-auto sticky top-0 left-0 z-10 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-[#1a2240] font-semibold text-lg">Vendor Panel</h2>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-[#f0f4fa] text-[#334580] transition-colors lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={`py-2 ${collapsed ? "hidden" : "block"} lg:block`}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${
              active === item.id
                ? "bg-[#f0f4fa] text-[#3d569a] border-l-4 border-[#3d569a]"
                : "text-[#334580] hover:bg-[#f0f4fa] hover:text-[#3d569a]"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 ${
                active === item.id ? "text-[#3d569a]" : "text-[#334580]"
              }`}
            >
              {item.icon}
            </div>
            <h5
              className={`hidden 800px:block pl-3 text-[15px] font-medium ${
                active === item.id ? "text-[#3d569a]" : "text-[#334580]"
              }`}
            >
              {item.title}
            </h5>
          </Link>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="mt-auto p-4 border-t border-gray-100 hidden 800px:block">
        <div className="bg-[#f0f4fa] rounded-lg p-3">
          <p className="text-xs text-[#334580] mb-1">Vendor Dashboard</p>
          <p className="text-sm font-medium text-[#1a2240]">ShoeSphere Seller</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardSideBar
