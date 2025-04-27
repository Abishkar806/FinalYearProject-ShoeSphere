import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { server } from "../../server"
import axios from "axios"
import { loadSeller } from "../../redux/actions/user"
import { toast } from "react-toastify"
import { FiUser, FiMapPin, FiPhone, FiMail, FiFileText, FiSave, FiCamera, FiInfo, FiHash } from "react-icons/fi"

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller)
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Form states
  const [avatar, setAvatar] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [zipCode, setZipcode] = useState("")
  const [email, setEmail] = useState("")

  // Initialize form with seller data when available
  useEffect(() => {
    if (seller) {
      setName(seller.name || "")
      setDescription(seller.description || "")
      setAddress(seller.address || "")
      setPhoneNumber(seller.phoneNumber || "")
      setZipcode(seller.zipCode || "")
      setEmail(seller.email || "")
    }
  }, [seller])

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // File type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or WebP)")
      return
    }

    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    setIsUploading(true)

    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
        try {
          await axios.put(`${server}/shop/update-shop-avatar`, { avatar: reader.result }, { withCredentials: true })
          dispatch(loadSeller())
          toast.success("Shop logo updated successfully!")
        } catch (error) {
          toast.error(error.response?.data?.message || "Error updating shop logo")
        } finally {
          setIsUploading(false)
        }
      }
    }

    reader.readAsDataURL(file)
  }

  const updateHandler = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true },
      )
      toast.success("Shop information updated successfully!")
      dispatch(loadSeller())
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating shop information")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a2240] mb-2">Shop Settings</h1>
          <p className="text-[#334580]">Manage your shop profile and information</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#dce5f3]">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] h-32 relative"></div>

          {/* Avatar Section */}
          <div className="flex justify-center -mt-16 relative z-10 mb-6">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-full border-4 border-white bg-[#f0f4fa] flex items-center justify-center overflow-hidden shadow-lg ${
                  isUploading ? "opacity-70" : ""
                }`}
              >
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : null}
                <img
                  src={avatar || seller?.avatar?.url || "/placeholder.svg"}
                  alt={seller?.name || "Shop"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0">
                <input type="file" id="avatar-upload" className="hidden" onChange={handleImage} accept="image/*" />
                <label
                  htmlFor="avatar-upload"
                  className="w-10 h-10 bg-[#3d569a] hover:bg-[#2d3a69] text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors"
                >
                  <FiCamera size={18} />
                </label>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={updateHandler} className="px-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shop Name */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-[#334580] mb-2">
                  <FiUser className="inline-block mr-2" /> Shop Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter shop name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-[#334580] mb-2">
                  <FiMail className="inline-block mr-2" /> Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg bg-[#f8fafd] text-gray-500"
                    readOnly
                  />
                </div>
                <p className="text-xs text-[#334580] mt-1">Email cannot be changed</p>
              </div>

              {/* Phone Number */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-[#334580] mb-2">
                  <FiPhone className="inline-block mr-2" /> Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Zip Code */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-[#334580] mb-2">
                  <FiHash className="inline-block mr-2" /> Zip Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    value={zipCode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-[#334580] mb-2">
                  <FiMapPin className="inline-block mr-2" /> Shop Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter shop address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-[#334580] mb-2">
                  <FiFileText className="inline-block mr-2" /> Shop Description
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Enter shop description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors min-h-[120px]"
                  ></textarea>
                </div>
                <p className="text-xs text-[#334580] mt-1">
                  A good description helps customers understand what your shop offers
                </p>
              </div>
            </div>

            {/* Information Box */}
            <div className="mt-8 bg-[#f0f4fa] p-4 rounded-lg border border-[#dce5f3] flex items-start">
              <FiInfo className="text-[#3d569a] mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-[#1a2240]">Shop Profile Visibility</h4>
                <p className="text-sm text-[#334580]">
                  Your shop profile information is visible to customers. Make sure to keep it updated with accurate
                  information to build trust with your customers.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#3d569a] hover:bg-[#2d3a69] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
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
                    Updating Shop...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShopSettings
