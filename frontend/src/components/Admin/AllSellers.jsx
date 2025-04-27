"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@material-ui/data-grid"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { Button } from "@material-ui/core"
import { RxCross1 } from "react-icons/rx"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"
import { getAllSellers } from "../../redux/actions/sellers"
import { Link } from "react-router-dom"
import { BiErrorCircle } from "react-icons/bi"

const AllSellers = () => {
  const dispatch = useDispatch()
  const { sellers } = useSelector((state) => state.seller)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    dispatch(getAllSellers())
  }, [dispatch])

  const handleDelete = async (id) => {
    await axios.delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message)
    })

    dispatch(getAllSellers())
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  color: "#000",
                }}
                title="View shop details"
              >
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => setUserId(params.id) || setOpen(true)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                color: "#ff0000",
              }}
              title="Delete seller"
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        )
      },
    },
  ]

  const row = []
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: formatDate(item.createdAt),
        address: item.address,
      })
    })

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2 border-b border-gray-200 mb-4">
          <span className="relative">
            All Sellers
            <span className="absolute bottom-[-8px] left-0 w-24 h-1 bg-black"></span>
          </span>
        </h3>
        <div className="w-full min-h-[45vh] bg-white rounded shadow-md border border-gray-200 overflow-hidden">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="bg-white"
            rowsPerPageOptions={[10, 20, 50]}
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000080] flex items-center justify-center h-screen transition-all duration-300">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} className="hover:text-red-500 transition-colors" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <BiErrorCircle size={60} className="text-red-500 mb-4" />
                <h3 className="text-[22px] text-center py-3 font-Poppins text-gray-800 font-medium">
                  Are you sure you want to delete this seller?
                </h3>
                <p className="text-gray-600 text-center mb-6">This action cannot be undone.</p>
              </div>
              <div className="w-full flex items-center justify-center gap-4">
                <button
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllSellers
