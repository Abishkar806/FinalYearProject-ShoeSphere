import React from "react"
// Full Header Component with Responsive Mobile Support
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo from "../../Assests/logo.png"
import { shoeCategoriesData } from "../../static/data"
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { BiMenuAltLeft } from "react-icons/bi"
import DropDown from "./DropDown"
import Navbar from "./Navbar"
import { useSelector } from "react-redux"
// import { backend_url } from "../../server";
import Cart from "../cart/Cart"
import Wishlist from "../Wishlist/Wishlist"
import { RxCross1 } from "react-icons/rx"
import { FiLogIn } from "react-icons/fi"
import { FaUserPlus } from "react-icons/fa"

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { isSeller } = useSelector((state) => state.seller)
  const { wishlist } = useSelector((state) => state.wishlist)
  const { cart } = useSelector((state) => state.cart)
  const { allProducts } = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState([])
  const [dropDown, setDropDown] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setSearchData(
      value.trim() ? allProducts.filter((product) => product.name.toLowerCase().includes(value.toLowerCase())) : [],
    )
  }

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 70)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleProductClick = () => {
    setSearchTerm("")
    setSearchData([])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden 800px:flex items-center justify-between py-4 px-6 shadow-md bg-white z-40 relative">
        <Link to="/">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-[140px] h-auto object-contain drop-shadow-md" />
        </Link>

        <div className="relative flex-grow max-w-[700px] mx-4 z-50">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-4 border-2 border-[#3d569a] rounded-md outline-none focus:border-[#2d3a69] transition"
          />
          <AiOutlineSearch className="absolute right-3 top-2 text-gray-500 cursor-pointer text-xl hover:text-[#3d569a] transition" />

          {searchData.length > 0 && (
            <div className="absolute top-[110%] left-0 w-full bg-white shadow-xl rounded-md p-2 z-50 border max-h-[500px] overflow-y-auto">
              {searchData.map((product, index) => (
                <Link to={`/product/${product._id}`} key={index} onClick={handleProductClick} className="block">
                  <div className="flex items-center p-2 hover:bg-[#f0f4fa] rounded-md">
                    <img
                      src={product.images[0]?.url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-[40px] h-[40px] mr-3 rounded-md"
                    />
                    <h1 className="text-sm font-semibold">{product.name}</h1>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to={isSeller ? "/dashboard" : "/shop-create"}>
          <button className="bg-[#3d569a] text-white px-5 py-2 rounded-md flex items-center font-semibold hover:bg-[#2d3a69] transition-transform transform hover:scale-105">
            {isSeller ? "Go Dashboard" : "Become Seller"}
            <IoIosArrowForward className="ml-1 text-lg" />
          </button>
        </Link>
      </div>

      {/* Sticky Navbar */}
      <div
        className={`w-full h-[70px] px-4 flex items-center transition-all duration-300 border-b border-[#334580] bg-[#1a2240] ${
          isSticky ? "fixed top-0 left-0 shadow-xl z-50" : "relative"
        } 800px:flex hidden`}
      >
        <div className="relative flex items-center justify-between w-full max-w-[1200px] mx-auto">
          <div className="relative flex-shrink-0">
            <button
              className="flex items-center w-[200px] h-[50px] bg-white text-[#1a2240] text-lg font-medium rounded-md px-4 shadow-lg hover:bg-[#f0f4fa] transition"
              onClick={() => setDropDown(!dropDown)}
            >
              <BiMenuAltLeft size={24} className="mr-2 text-[#3d569a]" />
              All Categories
              <IoIosArrowDown size={20} className="ml-auto text-[#3d569a]" />
            </button>
            {dropDown && <DropDown categoriesData={shoeCategoriesData} setDropDown={setDropDown} />}
          </div>
          <div className="flex space-x-6 text-white">
            <Navbar active={activeHeading} />
          </div>
          <div className="flex space-x-6 items-center">
            <Link className="relative group" onClick={() => setOpenWishlist(true)}>
              <AiOutlineHeart size={30} className="text-white hover:text-[#6a8cca] transition" />
              <span className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 text-[#1a2240] text-xs flex items-center justify-center font-bold">
                {wishlist?.length || 0}
              </span>
            </Link>
            <Link className="relative group" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} className="text-white hover:text-[#6a8cca] transition" />
              <span className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 text-[#1a2240] text-xs flex items-center justify-center font-bold">
                {cart?.length || 0}
              </span>
            </Link>
            {isAuthenticated ? (
              <Link to="/profile" className="group relative">
                <img
                  src={user?.avatar?.url || "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:border-[#6a8cca]"
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={30} className="text-white hover:text-[#6a8cca] transition" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="w-full 800px:hidden fixed bg-white z-50 top-0 left-0 shadow-md">
        <div className="w-full flex items-center justify-between px-4 py-2">
          <BiMenuAltLeft size={30} onClick={() => setOpen(true)} className="text-[#1a2240]" />
          <Link to="/">
            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-[60px]" />
          </Link>
          <Link className="relative group flex items-center justify-center w-10 h-10" onClick={() => setOpenCart(true)}>
            <AiOutlineShoppingCart size={28} className="text-[#1a2240] hover:text-[#3d569a] transition" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#3d569a] rounded-full w-5 h-5 text-white text-[10px] flex items-center justify-center font-bold">
              {cart?.length || 0}
            </span>
          </Link>
        </div>

        {/* Sidebar */}
        {open && (
          <div className="fixed w-full bg-black bg-opacity-40 z-40 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-white h-full top-0 left-0 z-50 overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <AiOutlineHeart size={30} className="text-[#3d569a]" />
                <RxCross1 size={30} onClick={() => setOpen(false)} className="text-[#1a2240]" />
              </div>
              <Navbar active={activeHeading} />
              <div className="ml-6 mt-4">
                <Link to="/shop-create">
                  <button className="bg-[#3d569a] text-white px-5 py-2 rounded-md flex items-center font-semibold hover:bg-[#2d3a69] transition-transform transform hover:scale-105">
                    Become Seller <IoIosArrowForward className="ml-1 text-lg" />
                  </button>
                </Link>
              </div>
              <div className="flex w-full justify-center mt-6">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-[#3d569a] shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                      <img
                        src={user?.avatar?.url || "/placeholder.svg"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-5 px-6">
                    <Link to="/login">
                      <button className="bg-[#3d569a] text-white px-6 py-2.5 rounded-md flex items-center font-semibold hover:bg-[#2d3a69] transition-transform transform hover:scale-105 shadow">
                        <FiLogIn className="mr-2 text-[18px]" /> Login
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="bg-black text-white px-6 py-2.5 rounded-md flex items-center font-semibold hover:bg-gray-900 transition-transform transform hover:scale-105 shadow">
                        <FaUserPlus className="mr-2 text-[18px]" /> Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  )
}

export default Header
