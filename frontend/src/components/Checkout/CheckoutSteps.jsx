import React from "react"
import { FiTruck, FiCreditCard, FiCheck } from "react-icons/fi"

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-[95%] 800px:w-[80%] lg:w-[70%] flex flex-col items-center">
        {/* Steps Container */}
        <div className="w-full flex items-center justify-between relative mb-8">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#f0f4fa] -translate-y-1/2 z-0"></div>

          {/* Progress Bar Active */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-[#3d569a] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: active === 1 ? "0%" : active === 2 ? "50%" : "100%" }}
          ></div>

          {/* Step 1: Shipping */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md 
              ${
                active >= 1 ? "bg-[#3d569a] text-white" : "bg-[#f0f4fa] text-[#3d569a] border border-[#dce5f3]"
              } transition-all duration-300`}
            >
              {active > 1 ? <FiCheck className="w-6 h-6" /> : <FiTruck className="w-5 h-5" />}
            </div>
            <div className="mt-2 flex flex-col items-center">
              <span className={`font-semibold text-sm ${active >= 1 ? "text-[#1a2240]" : "text-[#334580]"}`}>
                Step 1
              </span>
              <span className={`text-xs ${active >= 1 ? "text-[#334580]" : "text-gray-500"}`}>Shipping</span>
            </div>
          </div>

          {/* Step 2: Payment */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md 
              ${
                active >= 2 ? "bg-[#3d569a] text-white" : "bg-[#f0f4fa] text-[#3d569a] border border-[#dce5f3]"
              } transition-all duration-300`}
            >
              {active > 2 ? <FiCheck className="w-6 h-6" /> : <FiCreditCard className="w-5 h-5" />}
            </div>
            <div className="mt-2 flex flex-col items-center">
              <span className={`font-semibold text-sm ${active >= 2 ? "text-[#1a2240]" : "text-[#334580]"}`}>
                Step 2
              </span>
              <span className={`text-xs ${active >= 2 ? "text-[#334580]" : "text-gray-500"}`}>Payment</span>
            </div>
          </div>

          {/* Step 3: Success */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md 
              ${
                active >= 3 ? "bg-[#3d569a] text-white" : "bg-[#f0f4fa] text-[#3d569a] border border-[#dce5f3]"
              } transition-all duration-300`}
            >
              <FiCheck className={`w-5 h-5 ${active >= 3 ? "" : "opacity-50"}`} />
            </div>
            <div className="mt-2 flex flex-col items-center">
              <span className={`font-semibold text-sm ${active >= 3 ? "text-[#1a2240]" : "text-[#334580]"}`}>
                Step 3
              </span>
              <span className={`text-xs ${active >= 3 ? "text-[#334580]" : "text-gray-500"}`}>Success</span>
            </div>
          </div>
        </div>

        {/* Current Step Description */}
        <div className="w-full bg-white p-4 rounded-lg border border-[#dce5f3] shadow-sm">
          <h3 className="text-[#1a2240] font-semibold text-center">
            {active === 1 && "Please provide your shipping details"}
            {active === 2 && "Select your preferred payment method"}
            {active === 3 && "Order placed successfully!"}
          </h3>
          <p className="text-[#334580] text-sm text-center mt-1">
            {active === 1 && "We'll use this information to deliver your order"}
            {active === 2 && "Your payment information is encrypted and secure"}
            {active === 3 && "Thank you for your purchase. Your order is being processed"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps
