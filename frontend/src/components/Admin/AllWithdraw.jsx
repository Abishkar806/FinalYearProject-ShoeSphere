// ShopProfileData.jsx
import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { server } from "../../server"
import { DataGrid } from "@material-ui/data-grid"
import { BsPencil } from "react-icons/bs"
import { RxCross1 } from "react-icons/rx"
import { FiAlertTriangle } from "react-icons/fi"
import { toast } from "react-toastify"

const AllWithdraw = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [withdrawData, setWithdrawData] = useState()
  const [withdrawStatus, setWithdrawStatus] = useState("Processing")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.response?.data?.message || "An error occurred")
        setLoading(false)
      })
  }, [])

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const columns = [
    { field: "id", headerName: "Withdraw ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop ID",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <div
            className={`flex items-center justify-center py-1 px-3 rounded-full text-xs font-medium ${
              params.value === "Succeed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {params.value}
          </div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "Request Date",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return <div>{formatDate(params.value)}</div>
      },
    },
    {
      field: " ",
      headerName: "Update Status",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <button
            title="Update Status"
            disabled={params.row.status !== "Processing"}
            className={`${
              params.row.status !== "Processing"
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            } transition-colors duration-200 flex items-center justify-center`}
            onClick={() => {
              if (params.row.status === "Processing") {
                setOpen(true)
                setWithdrawData(params.row)
              }
            }}
          >
            <BsPencil size={20} />
          </button>
        )
      },
    },
  ]

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true },
      )

      toast.success("Withdraw request updated successfully!")
      setData(response.data.withdraws)
      setOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  const row = []

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "Rs. " + item.amount, // Changed from US$ to Rs.
        status: item.status,
        createdAt: item.createdAt,
      })
    })

  return (
    <div className="w-full p-4">
      <div className="w-full">
        <h3 className="text-[22px] font-Poppins pb-2 text-black border-b border-gray-200 mb-4">
          <span className="relative">
            All Withdraw Requests
            <span className="absolute bottom-[-8px] left-0 w-32 h-1 bg-black"></span>
          </span>
        </h3>

        <div className="w-full min-h-[45vh] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            autoHeight
            loading={loading}
            className="bg-white"
          />
        </div>
      </div>

      {/* Modal for updating withdrawal status */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Update Withdrawal Status</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <RxCross1 size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center justify-center text-yellow-500">
                <FiAlertTriangle size={50} />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
                <div className="text-lg font-semibold">{withdrawData?.amount}</div>
              </div>

              <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={withdrawStatus}>{withdrawData?.status}</option>
                  <option value="Succeed">Succeed</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllWithdraw
