import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersOfShop } from "../../redux/actions/order"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"
import { loadSeller } from "../../redux/actions/user"
import {
  FiDollarSign,
  FiPlus,
  FiTrash2,
  FiX,
  FiCreditCard,
  FiBriefcase,
  FiGlobe,
  FiUser,
  FiMapPin,
} from "react-icons/fi"

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState(50)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  })

  const dispatch = useDispatch()
  const { seller } = useSelector((state) => state.seller)

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id))
  }, [dispatch, seller])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    }

    try {
      await axios.put(`${server}/shop/update-payment-methods`, { withdrawMethod }, { withCredentials: true })
      toast.success("Withdraw method added successfully!")
      dispatch(loadSeller())
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: "",
        bankAccountNumber: "",
        bankHolderName: "",
        bankAddress: "",
      })
      setPaymentMethod(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteHandler = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this withdrawal method?");
    if (!userConfirmed) return;

    try {
      await axios.delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      toast.success("Withdraw method deleted successfully!")
      dispatch(loadSeller())
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error(
        withdrawAmount < 50
          ? "Minimum withdrawal amount is Rs.50"
          : "You don't have enough balance to withdraw this amount",
      )
      return
    }

    try {
      setIsSubmitting(true)
      await axios.post(
        `${server}/withdraw/create-withdraw-request`,
        { amount: withdrawAmount },
        { withCredentials: true },
      )
      toast.success("Withdrawal request submitted successfully!")
      setOpen(false)
      dispatch(loadSeller())
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableBalance = seller?.availableBalance?.toFixed(2) || "0.00"

  return (
    <div className="w-full min-h-[90vh] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#dce5f3]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] p-6 text-white">
            <h2 className="text-2xl font-bold">Withdraw Money</h2>
            <p className="text-blue-100 mt-1">Manage your earnings and withdrawals</p>
          </div>

          {/* Balance Display */}
          <div className="p-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-[#f0f4fa] rounded-full flex items-center justify-center mb-4">
              <FiDollarSign size={40} className="text-[#3d569a]" />
            </div>
            <h3 className="text-[#334580] text-lg font-medium mb-2">Available Balance</h3>
            <h2 className="text-4xl font-bold text-[#1a2240] mb-6">Rs.{availableBalance}</h2>
            <button
              onClick={() =>
                Number.parseFloat(availableBalance) < 50
                  ? toast.error("Minimum withdrawal amount is Rs.50")
                  : setOpen(true)
              }
              disabled={Number.parseFloat(availableBalance) < 50}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                Number.parseFloat(availableBalance) < 50
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#3d569a] text-white hover:bg-[#2d3a69] hover:shadow-lg"
              }`}
            >
              Withdraw Funds
            </button>
          </div>

          {/* Transaction History Preview */}
          <div className="px-8 pb-8">
            <div className="bg-[#f0f4fa] rounded-xl p-6">
              <h3 className="text-[#1a2240] font-semibold mb-2">Withdrawal Information</h3>
              <ul className="space-y-2 text-[#334580]">
                <li className="flex justify-between">
                  <span>Minimum withdrawal:</span>
                  <span className="font-medium">Rs.50.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Processing time:</span>
                  <span className="font-medium">3-5 business days</span>
                </li>
                <li className="flex justify-between">
                  <span>Service fee:</span>
                  <span className="font-medium">2% of withdrawal amount</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl bg-white rounded-xl shadow-2xl ${
              paymentMethod ? "max-h-[90vh] overflow-y-auto" : ""
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#dce5f3]">
              <h3 className="text-xl font-bold text-[#1a2240]">
                {paymentMethod ? "Add Withdrawal Method" : "Withdraw Funds"}
              </h3>
              <button
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="p-2 hover:bg-[#f0f4fa] rounded-full transition-colors"
              >
                <FiX size={20} className="text-[#334580]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {paymentMethod ? (
                <div>
                  <p className="text-[#334580] mb-6">
                    Please provide your bank details for withdrawals. All fields are required.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#334580] mb-1">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiBriefcase className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={bankInfo.bankName}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                          placeholder="Enter your bank name"
                          className="pl-10 w-full px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#334580] mb-1">
                        Bank Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiGlobe className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={bankInfo.bankCountry}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankCountry: e.target.value })}
                          placeholder="Enter your bank country"
                          className="pl-10 w-full px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#334580] mb-1">
                          Swift Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={bankInfo.bankSwiftCode}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankSwiftCode: e.target.value })}
                          placeholder="Enter swift code"
                          className="w-full px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#334580] mb-1">
                          Account Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={bankInfo.bankAccountNumber}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankAccountNumber: e.target.value })}
                          placeholder="Enter account number"
                          className="w-full px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#334580] mb-1">
                        Account Holder Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={bankInfo.bankHolderName}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankHolderName: e.target.value })}
                          placeholder="Enter account holder name"
                          className="pl-10 w-full px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#334580] mb-1">
                        Bank Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <FiMapPin className="text-gray-400" />
                        </div>
                        <textarea
                          required
                          value={bankInfo.bankAddress}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankAddress: e.target.value })}
                          placeholder="Enter bank address"
                          className="pl-10 w-full px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors min-h-[80px]"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#3d569a] hover:bg-[#2d3a69] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Save Bank Details"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-[#1a2240] mb-4">Withdrawal Method</h3>

                  {seller && seller?.withdrawMethod ? (
                    <div className="mb-6">
                      <div className="bg-[#f0f4fa] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center mb-2">
                              <FiCreditCard className="text-[#3d569a] mr-2" />
                              <span className="font-medium text-[#1a2240]">Bank Account</span>
                            </div>
                            <p className="text-[#334580] text-sm">
                              {seller?.withdrawMethod.bankName} (
                              {"*".repeat(seller?.withdrawMethod.bankAccountNumber.length - 4) +
                                seller?.withdrawMethod.bankAccountNumber.slice(-4)}
                              )
                            </p>
                          </div>
                          <button
                            onClick={deleteHandler}
                            className="p-2 hover:bg-white rounded-full transition-colors text-red-500 hover:text-red-600"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-[#dce5f3] pt-6 mb-6">
                        <h4 className="text-[#1a2240] font-medium mb-4">Withdrawal Amount</h4>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="relative w-full sm:w-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiDollarSign className="text-gray-400" />
                            </div>
                            <input
                              type="number"
                              min="50"
                              max={availableBalance}
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                              className="pl-10 w-full sm:w-[150px] px-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                            />
                          </div>
                          <button
                            onClick={withdrawHandler}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-[#3d569a] hover:bg-[#2d3a69] text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              "Withdraw"
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-[#334580] mt-2">
                          Minimum withdrawal: Rs.50 | Available: Rs.{availableBalance}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-[#f0f4fa] rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCreditCard size={24} className="text-[#3d569a]" />
                      </div>
                      <h3 className="text-lg font-medium text-[#1a2240] mb-2">No Withdrawal Method</h3>
                      <p className="text-[#334580] mb-6">
                        You need to add a bank account before you can withdraw funds.
                      </p>
                      <button
                        onClick={() => setPaymentMethod(true)}
                        className="bg-[#3d569a] hover:bg-[#2d3a69] text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
                      >
                        <FiPlus className="mr-2" /> Add Bank Account
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WithdrawMoney
