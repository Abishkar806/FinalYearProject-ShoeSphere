
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <div className="w-full h-[80px] bg-white shadow-sm sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link to="/">
          <img src="../../Assests/logo.png" alt="" className="h-[50px] object-contain" />
        </Link>
        <div className="hidden md:flex ml-6">
          <h1 className="text-xl font-semibold">ShoeSphere</h1>
        </div>
      </div>

     

        <div className="flex items-center gap-2">
          <Link to="/admin/profile">
            <img
              src={`${user?.avatar?.url}`}
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover border border-gray-200"
            />
          </Link>
        </div>
      </div>
  )
}

export default AdminHeader
