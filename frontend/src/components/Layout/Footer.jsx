import React from "react"
import { Link } from "react-router-dom"
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillYoutube } from "react-icons/ai"

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#1a2240] via-[#2d3a69] to-black text-white">
      {/* Subscription Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="md:flex md:justify-between md:items-center text-center md:text-left">
            {/* Heading Section */}
            <h1 className="lg:text-4xl text-3xl font-semibold mb-6 md:mb-0 leading-tight">
              <span className="text-[#6a8cca]">Subscribe</span> to stay updated <br />
              with our latest news & exclusive offers!
            </h1>

            {/* Subscription Form */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                className="text-gray-900 w-full sm:w-80 py-3 px-5 rounded-lg shadow-lg bg-white bg-opacity-90 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-[#3d569a]"
              />
              <button className="bg-[#3d569a] hover:bg-[#4e6fb8] text-white font-bold px-7 py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Subscribe 🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center sm:text-left">
        {/* Company Logo & Description */}
        <div>
          <h1 className="text-2xl font-semibold">ShoeSphere</h1>
          <p className="text-gray-400 text-sm mt-2">Your one-stop destination for premium sneakers and footwear.</p>
          <div className="flex justify-center sm:justify-start mt-4 gap-3">
            <AiFillFacebook size={25} className="cursor-pointer hover:text-[#6a8cca]" />
            <AiOutlineTwitter size={25} className="cursor-pointer hover:text-[#6a8cca]" />
            <AiFillInstagram size={25} className="cursor-pointer hover:text-[#6a8cca]" />
            <AiFillYoutube size={25} className="cursor-pointer hover:text-[#6a8cca]" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Company</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Store Locations
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Our Blog
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Customer Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Shop</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Men's Sneakers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Women's Sneakers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Limited Editions
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Running Shoes
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Casual Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Support</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#bfd0ea] transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom with Black Background */}
      <div className="bg-black py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ShoeSphere. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
