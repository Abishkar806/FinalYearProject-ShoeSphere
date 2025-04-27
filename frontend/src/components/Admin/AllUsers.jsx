// ShopProfileData.jsx
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../redux/actions/user"
import { DataGrid } from "@material-ui/data-grid"
import { AiOutlineDelete } from "react-icons/ai"
import { Button } from "@material-ui/core"
import { RxCross1 } from "react-icons/rx"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"
import { FiAlertTriangle } from "react-icons/fi"

const AllUsers = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const handleDelete = async (id) => {
    await axios.delete(`${server}/user/delete-user/${id}`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message)
    })

    dispatch(getAllUsers())
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

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
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              params.value === "admin" ? "bg-black text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {params.value}
          </div>
        )
      },
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => {
        return formatDate(params.value)
      },
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => setUserId(params.id) || setOpen(true)}
              title="Delete User"
              style={{
                color: "#ff0000",
                transition: "all 0.3s ease",
              }}
              className="hover:bg-red-50"
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        )
      },
    },
  ]

  const row = []
  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      })
    })

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="mb-4">
          <h3 className="text-[22px] font-Poppins pb-2 relative inline-block">
            All Users
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
          </h3>
          {users && <span className="text-gray-500 text-sm ml-4">({users.length} total)</span>}
        </div>

        <div className="w-full min-h-[45vh] bg-white rounded shadow-md border border-gray-200 overflow-hidden">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            autoHeight
            className="bg-white"
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f9fafb",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              },
            }}
          />
        </div>

        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000080] flex items-center justify-center h-screen animate-fade-in">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded-lg shadow-lg p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} className="hover:text-red-500 transition-colors" />
              </div>

              <div className="flex flex-col items-center justify-center py-5">
                <FiAlertTriangle size={50} className="text-red-500 mb-4" />
                <h3 className="text-[22px] text-center font-Poppins text-[#000000cb] mb-2">Delete User</h3>
                <p className="text-gray-500 text-center mb-6">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
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

export default AllUsers
