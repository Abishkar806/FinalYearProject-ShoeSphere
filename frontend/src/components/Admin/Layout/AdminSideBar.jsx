import { FiShoppingBag } from "react-icons/fi"
import { GrWorkshop } from "react-icons/gr"
import { RxDashboard } from "react-icons/rx"
import { CiMoneyBill } from "react-icons/ci"
import { Link } from "react-router-dom"
import { HiOutlineUserGroup } from "react-icons/hi"
import { BsHandbag } from "react-icons/bs"
import { MdOutlineLocalOffer } from "react-icons/md"
import { AiOutlineSetting } from "react-icons/ai"

const AdminSideBar = ({ active }) => {
  // Black and white theme colors with white background
  const activeColor = "#000000" // Black for active
  const inactiveColor = "#555555" // Dark gray for inactive
  const activeTextClass = "text-black font-medium"
  const inactiveTextClass = "text-gray-600"

  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10">
      {/* Admin title */}
      <div className="w-full border-b border-gray-200 py-4 px-4">
        <h2 className="text-black text-xl font-semibold">Admin Panel</h2>
      </div>

      {/* single item */}
      <div className={`w-full ${active === 1 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin/dashboard" className="w-full flex items-center p-4">
          <RxDashboard size={24} color={active === 1 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 1 ? activeTextClass : inactiveTextClass
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 2 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin-orders" className="w-full flex items-center p-4">
          <FiShoppingBag size={24} color={active === 2 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 2 ? activeTextClass : inactiveTextClass
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 3 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin-sellers" className="w-full flex items-center p-4">
          <div className={active === 3 ? "text-black" : "text-gray-600"}>
            <GrWorkshop size={24} />
          </div>
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 3 ? activeTextClass : inactiveTextClass
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 4 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin-users" className="w-full flex items-center p-4">
          <HiOutlineUserGroup size={24} color={active === 4 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 4 ? activeTextClass : inactiveTextClass
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 5 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin-products" className="w-full flex items-center p-4">
          <BsHandbag size={24} color={active === 5 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 5 ? activeTextClass : inactiveTextClass
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 6 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin-events" className="w-full flex items-center p-4">
          <MdOutlineLocalOffer size={24} color={active === 6 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 6 ? activeTextClass : inactiveTextClass
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 7 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/admin-withdraw-request" className="w-full flex items-center p-4">
          <CiMoneyBill size={24} color={active === 7 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 7 ? activeTextClass : inactiveTextClass
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className={`w-full ${active === 8 ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link to="/profile" className="w-full flex items-center p-4">
          <AiOutlineSetting size={24} color={active === 8 ? activeColor : inactiveColor} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 8 ? activeTextClass : inactiveTextClass
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  )
}

export default AdminSideBar
