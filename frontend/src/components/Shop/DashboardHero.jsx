import React from "react"
import { useEffect } from "react"
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai"
import { Link } from "react-router-dom"
import { MdBorderClear } from "react-icons/md"
import { FiPackage } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersOfShop } from "../../redux/actions/order"
import { getAllProductsShop } from "../../redux/actions/product"
import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"

const DashboardHero = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order)
  const { seller } = useSelector((state) => state.seller)
  const { products } = useSelector((state) => state.products)

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllOrdersOfShop(seller._id))
      dispatch(getAllProductsShop(seller._id))
    }
  }, [dispatch, seller])

  const availableBalance = seller?.availableBalance ? seller.availableBalance.toFixed(2) : "0.00"

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} className="text-[#3d569a]" />
              </Button>
            </Link>
          </>
        )
      },
    },
  ]

  const row = []

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "Rs." + item.totalPrice,
        status: item.status,
      })
    })

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-bold text-[#1a2240] pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between gap-4">
        {/* Account Balance Card */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow-md rounded-xl px-4 py-5 border border-[#dce5f3] hover:shadow-lg transition-all">
          <div className="flex items-center">
            <div className="p-2 bg-[#f0f4fa] rounded-lg mr-2">
              <AiOutlineMoneyCollect size={30} className="text-[#3d569a]" />
            </div>
            <h3 className="text-[18px] leading-5 font-medium text-[#1a2240]">
              Account Balance <span className="text-[14px] text-[#334580] block mt-1">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-3 pl-[46px] text-[22px] font-bold text-[#1a2240]">Rs.{availableBalance}</h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[46px] text-[#3d569a] hover:text-[#2d3a69] font-medium transition-colors">
              Withdraw Money
            </h5>
          </Link>
        </div>

        {/* All Orders Card */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow-md rounded-xl px-4 py-5 border border-[#dce5f3] hover:shadow-lg transition-all">
          <div className="flex items-center">
            <div className="p-2 bg-[#f0f4fa] rounded-lg mr-2">
              <MdBorderClear size={30} className="text-[#3d569a]" />
            </div>
            <h3 className="text-[18px] leading-5 font-medium text-[#1a2240]">
              All Orders
              <span className="text-[14px] text-[#334580] block mt-1">Manage your orders</span>
            </h3>
          </div>
          <h5 className="pt-3 pl-[46px] text-[22px] font-bold text-[#1a2240]">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-[46px] text-[#3d569a] hover:text-[#2d3a69] font-medium transition-colors">
              View Orders
            </h5>
          </Link>
        </div>

        {/* All Products Card */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow-md rounded-xl px-4 py-5 border border-[#dce5f3] hover:shadow-lg transition-all">
          <div className="flex items-center">
            <div className="p-2 bg-[#f0f4fa] rounded-lg mr-2">
              <FiPackage size={30} className="text-[#3d569a]" />
            </div>
            <h3 className="text-[18px] leading-5 font-medium text-[#1a2240]">
              All Products
              <span className="text-[14px] text-[#334580] block mt-1">Manage your inventory</span>
            </h3>
          </div>
          <h5 className="pt-3 pl-[46px] text-[22px] font-bold text-[#1a2240]">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-[46px] text-[#3d569a] hover:text-[#2d3a69] font-medium transition-colors">
              View Products
            </h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-bold text-[#1a2240] pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded-xl shadow-md border border-[#dce5f3]">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          className="bg-white rounded-xl"
        />
      </div>

      {/* Add these styles for the DataGrid */}
      <style jsx global>{`
        .greenColor {
          color: #4caf50 !important;
        }
        .redColor {
          color: #f44336 !important;
        }
        .MuiDataGrid-root {
          border: none !important;
        }
        .MuiDataGrid-columnHeaders {
          background-color: #f0f4fa;
          color: #1a2240;
          font-weight: 600;
        }
        .MuiDataGrid-footerContainer {
          background-color: #f0f4fa;
          border-top: none;
        }
      `}</style>
    </div>
  )
}

export default DashboardHero
