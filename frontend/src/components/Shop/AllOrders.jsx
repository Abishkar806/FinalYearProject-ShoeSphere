import React from "react"
import { useEffect } from "react"





import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../Layout/Loader"
import { getAllOrdersOfShop } from "../../redux/actions/order"
import { AiOutlineArrowRight } from "react-icons/ai"

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order)
  const { seller } = useSelector((state) => state.seller)

  const dispatch = useDispatch()

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllOrdersOfShop(seller._id))
    }
  }, [dispatch, seller])

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "products",
      headerName: "Products",
      minWidth: 180,
      flex: 1.2,
      renderCell: (params) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium text-[#1a2240] truncate">{params.value.mainProduct}</span>
            {params.value.otherCount > 0 && (
              <span className="text-xs text-[#334580]">+{params.value.otherCount} more items</span>
            )}
          </div>
        )
      },
    },
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
            <Link to={`/order/${params.id}`}>
              <Button className="!p-2 !min-w-[40px] !rounded-full hover:!bg-[#f0f4fa]">
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
      // Extract product information
      const productInfo = {
        mainProduct: item.cart[0]?.name || "Unknown Product",
        otherCount: item.cart.length > 1 ? item.cart.length - 1 : 0,
      }

      row.push({
        id: item._id,
        products: productInfo,
        itemsQty: item.cart.length,
        total: "Rs." + item.totalPrice,
        status: item.status,
      })
    })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-8 pt-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1a2240] mb-6">All Orders</h2>
          <div className="bg-white rounded-xl shadow-md border border-[#dce5f3] overflow-hidden">
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
              font-weight: 600;
            }
            .redColor {
              color: #f44336 !important;
              font-weight: 600;
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
            .MuiDataGrid-cell:focus,
            .MuiDataGrid-cell:focus-within {
              outline: none !important;
            }
            .MuiDataGrid-row:hover {
              background-color: #f0f4fa !important;
            }
          `}</style>
        </div>
      )}
    </>
  )
}

export default AllOrders
