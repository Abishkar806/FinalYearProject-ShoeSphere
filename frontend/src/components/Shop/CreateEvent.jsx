"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createevent } from "../../redux/actions/event"
import { shoeCategoriesData } from "../../static/data"
import { toast } from "react-toastify"
import {
  FiUploadCloud,
  FiDollarSign,
  FiTag,
  FiPackage,
  FiLayers,
  FiEdit3,
  FiImage,
  FiX,
  FiCalendar,
} from "react-icons/fi"

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller)
  const { success, error } = useSelector((state) => state.events)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [images, setImages] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [stock, setStock] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value)
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    setStartDate(startDate)
    setEndDate(null)

    const endDateInput = document.getElementById("end-date")
    if (endDateInput) {
      endDateInput.min = minEndDate.toISOString().slice(0, 10)
    }
  }

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value))
  }

  const today = new Date().toISOString().slice(0, 10)
  const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : ""

  useEffect(() => {
    if (error) {
      toast.error(error)
      setIsSubmitting(false)
    }
    if (success) {
      toast.success("✅ Event added successfully!")
      navigate("/dashboard-events")
    }
  }, [dispatch, error, success, navigate])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newForm = new FormData()

    images.forEach((image) => {
      newForm.append("images", image)
    })

    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
      start_Date: startDate?.toISOString(),
      Finish_Date: endDate?.toISOString(),
    }

    dispatch(createevent(data))
  }

  return (
    <div className="w-full px-4 md:px-8 pt-6 mt-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="h-12 w-1 bg-gradient-to-b from-[#3d569a] to-[#1a2240] rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a2240] to-[#3d569a] inline-block text-transparent bg-clip-text">
            Create New Event
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#dce5f3] overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] p-6 text-white">
            <div className="flex items-center space-x-3">
              <FiCalendar className="text-2xl" />
              <h3 className="text-xl font-semibold">Event Information</h3>
            </div>
            <p className="text-blue-100 mt-2 ml-9">Fill in the details to create a new event listing</p>
          </div>

          {/* create event form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-6">
                <div className="group">
                  <label className="flex items-center text-sm font-medium text-[#334580] mb-2 group-focus-within:text-[#3d569a] transition-colors">
                    <FiEdit3 className="mr-2" />
                    Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your event product name..."
                    required
                  />
                </div>

                <div className="group">
                  <label className="flex items-center text-sm font-medium text-[#334580] mb-2 group-focus-within:text-[#3d569a] transition-colors">
                    <FiLayers className="mr-2" />
                    Description <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    cols="30"
                    required
                    rows="9"
                    type="text"
                    name="description"
                    value={description}
                    className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your event product description..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="flex items-center text-sm font-medium text-[#334580] mb-2 group-focus-within:text-[#3d569a] transition-colors">
                      <FiTag className="mr-2" />
                      Category <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm 
                      focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all bg-white"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Choose a category</option>
                      {shoeCategoriesData &&
                        shoeCategoriesData.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="group">
                    <label className="flex items-center text-sm font-medium text-[#334580] mb-2 group-focus-within:text-[#3d569a] transition-colors">
                      <FiTag className="mr-2" />
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="w-full px-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm placeholder-gray-400 
                      focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter event product tags..."
                    />
                  </div>
                </div>

                <div className="bg-[#f8fafd] p-6 rounded-xl border border-[#dce5f3]">
                  <p className="text-sm font-medium text-[#334580] mb-4 flex items-center">
                    <FiCalendar className="mr-2" /> Event Dates
                  </p>

                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-sm font-medium text-[#334580] mb-1.5 group-focus-within:text-[#3d569a] transition-colors">
                        Event Start Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiCalendar className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="startDate"
                          id="start-date"
                          value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                          className="w-full pl-10 pr-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm 
                          focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                          onChange={handleStartDateChange}
                          min={today}
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-[#334580] mb-1.5 group-focus-within:text-[#3d569a] transition-colors">
                        Event End Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiCalendar className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="endDate"
                          id="end-date"
                          value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                          className="w-full pl-10 pr-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm 
                          focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                          onChange={handleEndDateChange}
                          min={minEndDate}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div className="group">
                  <label className="flex items-center text-sm font-medium text-[#334580] mb-2 group-focus-within:text-[#3d569a] transition-colors">
                    <FiImage className="mr-2" />
                    Upload Images <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="file" name="" id="upload" className="hidden" multiple onChange={handleImageChange} />

                  <div
                    className="mt-2 border-2 border-dashed border-[#dce5f3] rounded-xl p-8 bg-[#f8fafd] 
                  transition-all hover:border-[#3d569a] hover:bg-[#f0f4fa] group"
                  >
                    <label htmlFor="upload" className="flex flex-col items-center justify-center cursor-pointer h-full">
                      <div
                        className="w-16 h-16 bg-[#e9eef8] rounded-full flex items-center justify-center mb-4 
                      group-hover:bg-[#3d569a]/10 transition-all"
                      >
                        <FiUploadCloud size={30} className="text-[#3d569a]" />
                      </div>
                      <span className="text-[#334580] font-medium text-lg">Drag & drop or click to upload</span>
                      <span className="text-sm text-[#6b7a99] mt-2 text-center">
                        Upload high-quality event images (PNG, JPG)
                        <br />
                        Maximum 5 images recommended
                      </span>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="mt-6 bg-[#f8fafd] p-4 rounded-xl border border-[#dce5f3]">
                      <p className="text-sm font-medium text-[#334580] mb-3 flex items-center">
                        <FiImage className="mr-2" /> Event Images ({images.length})
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group/image">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Event ${index + 1}`}
                              className="h-[120px] w-full object-cover rounded-lg border-2 border-[#dce5f3] shadow-sm 
                              transition-all group-hover/image:border-[#3d569a]"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full 
                              shadow-md opacity-0 group-hover/image:opacity-100 transition-all"
                            >
                              <FiX className="text-red-500" size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 space-y-6">
                    <div className="bg-[#f8fafd] p-6 rounded-xl border border-[#dce5f3]">
                      <p className="text-sm font-medium text-[#334580] mb-4 flex items-center">
                        <FiDollarSign className="mr-2" /> Pricing & Inventory
                      </p>

                      <div className="space-y-4">
                        <div className="group">
                          <label className="block text-sm font-medium text-[#334580] mb-1.5 group-focus-within:text-[#3d569a] transition-colors">
                            Original Price
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <FiDollarSign className="text-gray-400" />
                            </div>
                            <input
                              type="number"
                              name="originalPrice"
                              value={originalPrice}
                              className="w-full pl-10 pr-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm placeholder-gray-400 
                              focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                              onChange={(e) => setOriginalPrice(e.target.value)}
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-[#334580] mb-1.5 group-focus-within:text-[#3d569a] transition-colors">
                            Discounted Price <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <FiDollarSign className="text-gray-400" />
                            </div>
                            <input
                              type="number"
                              name="discountPrice"
                              value={discountPrice}
                              className="w-full pl-10 pr-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm placeholder-gray-400 
                              focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                              onChange={(e) => setDiscountPrice(e.target.value)}
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-[#334580] mb-1.5 group-focus-within:text-[#3d569a] transition-colors">
                            Stock Quantity <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <FiPackage className="text-gray-400" />
                            </div>
                            <input
                              type="number"
                              name="stock"
                              value={stock}
                              className="w-full pl-10 pr-4 py-3 border-2 border-[#dce5f3] rounded-lg shadow-sm placeholder-gray-400 
                              focus:outline-none focus:border-[#3d569a] focus:ring-2 focus:ring-[#3d569a]/20 transition-all"
                              onChange={(e) => setStock(e.target.value)}
                              placeholder="0"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#dce5f3]">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative overflow-hidden group bg-gradient-to-r from-[#1a2240] to-[#3d569a] text-white font-semibold 
                py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl 
                hover:from-[#3d569a] hover:to-[#1a2240] ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}`}
              >
                <span className="relative z-10 flex items-center justify-center">
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
                      Creating Event...
                    </>
                  ) : (
                    <>Create Event</>
                  )}
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent
