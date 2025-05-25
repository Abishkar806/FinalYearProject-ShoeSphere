import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi'

const KhaltiVerification = () => {
  const [searchParams] = useSearchParams()
  const [verificationStatus, setVerificationStatus] = useState('loading') // loading, success, failed
  const [orderDetails, setOrderDetails] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    verifyKhaltiPayment()
  }, [])

  const verifyKhaltiPayment = async () => {
    try {
      // Get parameters from URL or localStorage
      const pidx = searchParams.get('pidx') || localStorage.getItem('khaltiPidx')
      const orderIds = searchParams.get('orderIds') || localStorage.getItem('khaltiOrderIds')

      if (!pidx) {
        toast.error('Payment verification failed - Missing payment ID')
        setVerificationStatus('failed')
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // Verify payment with backend
      const { data } = await axios.post(
        `${server}/order/verify-khalti-payment`,
        { pidx, orderIds },
        config
      )

      if (data.success) {
        setVerificationStatus('success')
        setOrderDetails(data.orders)
        toast.success('Payment verified successfully!')
        
        // Clean up localStorage
        localStorage.removeItem('khaltiPidx')
        localStorage.removeItem('khaltiOrderIds')
        localStorage.setItem('cartItems', JSON.stringify([]))
        localStorage.setItem('latestOrder', JSON.stringify([]))
        
        // Redirect to success page after delay
        setTimeout(() => {
          navigate('/order/success')
        }, 3000)
      } else {
        setVerificationStatus('failed')
        toast.error(data.message || 'Payment verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setVerificationStatus('failed')
      toast.error(error.response?.data?.message || 'Payment verification failed')
    }
  }

  const handleRetryPayment = () => {
    // Clear failed payment data and redirect back to payment
    localStorage.removeItem('khaltiPidx')
    localStorage.removeItem('khaltiOrderIds')
    navigate('/payment')
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="w-full bg-[#f0f4fa] min-h-screen py-8">
      <div className="w-[95%] 1000px:w-[70%] m-auto">
        <div className="bg-white rounded-xl p-8 shadow-md border border-[#dce5f3] text-center">
          {verificationStatus === 'loading' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FiLoader className="text-blue-600 text-4xl animate-spin" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a2240] mb-2">
                  Verifying Payment
                </h2>
                <p className="text-[#334580]">
                  Please wait while we verify your Khalti payment...
                </p>
              </div>
              <div className="animate-pulse bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <FiCheckCircle className="text-green-600 text-4xl" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Payment Successful!
                </h2>
                <p className="text-[#334580] mb-4">
                  Your Khalti payment has been verified successfully.
                </p>
                
                {orderDetails && orderDetails.length > 0 && (
                  <div className="bg-[#f0f4fa] p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-[#1a2240] mb-2">
                      Order Details:
                    </h3>
                    <div className="space-y-2">
                      {orderDetails.map((order, index) => (
                        <div key={order._id} className="text-sm text-[#334580]">
                          <p>Order #{index + 1}: {order._id}</p>
                          <p>Amount: Rs. {order.totalPrice}</p>
                          <p>Status: {order.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-[#334580]">
                  Redirecting to order success page in 3 seconds...
                </p>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/order/success')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                  View Orders
                </button>
              </div>
            </div>
          )}

          {verificationStatus === 'failed' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-red-100 p-4 rounded-full">
                  <FiXCircle className="text-red-600 text-4xl" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Payment Verification Failed
                </h2>
                <p className="text-[#334580] mb-4">
                  We couldn't verify your Khalti payment. This could be due to:
                </p>
                <ul className="text-sm text-[#334580] text-left max-w-md mx-auto space-y-1">
                  <li>• Payment was cancelled or incomplete</li>
                  <li>• Network connectivity issues</li>
                  <li>• Payment timeout</li>
                  <li>• Technical error during verification</li>
                </ul>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRetryPayment}
                  className="bg-[#5D2C91] hover:bg-[#4A1D7A] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={handleGoHome}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payment Status Indicator */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-md border border-[#dce5f3]">
          <div className="flex items-center justify-center gap-2 text-sm text-[#334580]">
            <img 
              src="https://khalti.s3.ap-south-1.amazonaws.com/website/khalti-logo-white.png" 
              alt="Khalti" 
              className="h-6 bg-[#5D2C91] px-2 py-1 rounded"
            />
            <span>Secured by Khalti Payment Gateway</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KhaltiVerification