import React from "react"
import { useEffect } from "react"
import { AiOutlineMoneyCollect } from "react-icons/ai"
import { MdBorderClear } from "react-icons/md"
import { Link } from "react-router-dom"
import { DataGrid } from "@material-ui/data-grid"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersOfAdmin } from "../../redux/actions/order"
import Loader from "../Layout/Loader"
import { getAllSellers } from "../../redux/actions/sellers"
import { FiPackage } from "react-icons/fi"

const AdminDashboardMain = () => {
  const dispatch = useDispatch()

  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order)
  const { sellers } = useSelector((state) => state.seller)

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin())
    dispatch(getAllSellers())
  }, [dispatch])

  const adminEarning = adminOrders && adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0)

  const adminBalance = adminEarning?.toFixed(2)

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-28 py-1 rounded-full text-xs font-medium ${
              params.value === "Delivered"
                ? "bg-green-100 text-green-800"
                : params.value === "Processing"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {params.value}
          </div>
        )
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ]

  const row = []
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: "Rs. " + item?.totalPrice,
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      })
    })

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2 text-black border-b border-gray-200 mb-4">
            <span className="relative">
              Overview
              <span className="absolute bottom-[-8px] left-0 w-20 h-1 bg-black"></span>
            </span>
          </h3>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Earning Card */}
            <div className="w-full h-[200px] bg-white border border-gray-200 shadow-md rounded-lg px-4 py-5 text-black transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-100 rounded-full mr-3">
                  <AiOutlineMoneyCollect size={24} className="text-black" />
                </div>
                <h3 className="text-[16px] font-medium">Total Earning</h3>
              </div>
              <div>
                <h5 className="text-[28px] font-bold">Rs. {adminBalance}</h5>
                <div className="flex items-center mt-2 text-gray-600 text-sm">
                  <span>10% of all sales</span>
                </div>
              </div>
            </div>

            {/* All Sellers Card */}
            <div className="w-full h-[200px] bg-white border border-gray-200 shadow-md rounded-lg px-4 py-5 text-black transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-100 rounded-full mr-3">
                  <MdBorderClear size={24} className="text-black" />
                </div>
                <h3 className="text-[16px] font-medium">All Sellers</h3>
              </div>
              <div>
                <h5 className="text-[28px] font-bold">{sellers && sellers.length}</h5>
                <Link
                  to="/admin-sellers"
                  className="inline-block mt-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  View Sellers
                </Link>
              </div>
            </div>

            {/* All Orders Card */}
            <div className="w-full h-[200px] bg-white border border-gray-200 shadow-md rounded-lg px-4 py-5 text-black transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-100 rounded-full mr-3">
                  <FiPackage size={24} className="text-black" />
                </div>
                <h3 className="text-[16px] font-medium">All Orders</h3>
              </div>
              <div>
                <h5 className="text-[28px] font-bold">{adminOrders && adminOrders.length}</h5>
                <Link
                  to="/admin-orders"
                  className="inline-block mt-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  View Orders
                </Link>
              </div>
            </div>
          </div>

          <h3 className="text-[22px] font-Poppins pb-2 mt-6 text-black border-b border-gray-200 mb-4">
            <span className="relative">
              Latest Orders
              <span className="absolute bottom-[-8px] left-0 w-32 h-1 bg-black"></span>
            </span>
          </h3>

          <div className="w-full min-h-[45vh] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="datagrid-custom">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
                className="bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboardMain
