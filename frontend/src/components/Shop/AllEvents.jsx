import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event"
import { toast } from "react-toastify"
import { DataGrid } from "@material-ui/data-grid"
import { FiCalendar, FiEye, FiTrash2, FiSearch, FiPlus, FiClock, FiPackage, FiShoppingCart } from "react-icons/fi"
import Loader from "../Layout/Loader"

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events)
  const { seller } = useSelector((state) => state.seller)
  const dispatch = useDispatch()
  const [localEvents, setLocalEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null })

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id))
    }
  }, [dispatch, seller?._id])

  useEffect(() => {
    setLocalEvents(events)
  }, [events])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvent(id, seller._id))
      toast.success("Event deleted successfully!")
      setLocalEvents((prev) => prev.filter((item) => item._id !== id))
      setDeleteConfirm({ show: false, id: null })
    } catch (error) {
      toast.error("Failed to delete event!")
      console.error(error)
      setDeleteConfirm({ show: false, id: null })
    }
  }

  const filteredEvents = localEvents?.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    {
      field: "id",
      headerName: "Event ID",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <FiCalendar className="mr-2 text-[#3d569a]" />
            <span className="font-medium text-[#1a2240]">{params.value}</span>
          </div>
        )
      },
    },
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 180,
      flex: 1.4,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <div className="font-medium text-[#1a2240]">{params.value}</div>
          </div>
        )
      },
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
      renderCell: (params) => {
        return <div className="font-semibold text-[#3d569a]">{params.value}</div>
      },
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <FiPackage className="mr-2 text-gray-500" />
            <span className={`font-medium ${params.value < 10 ? "text-red-500" : "text-green-600"}`}>
              {params.value}
            </span>
          </div>
        )
      },
    },
    {
      field: "sold",
      headerName: "Sold",
      type: "number",
      minWidth: 100,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <FiShoppingCart className="mr-2 text-gray-500" />
            <span className="font-medium text-[#334580]">{params.value}</span>
          </div>
        )
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <FiClock className="mr-2 text-gray-500" />
            <span className="font-medium text-[#334580]">{params.value}</span>
          </div>
        )
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <FiClock className="mr-2 text-gray-500" />
            <span className="font-medium text-[#334580]">{params.value}</span>
          </div>
        )
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center space-x-2">
            <Link to={`/product/${params.id}`}>
              <button className="p-2 bg-[#f0f4fa] hover:bg-[#dce5f3] rounded-full transition-colors">
                <FiEye size={18} className="text-[#3d569a]" />
              </button>
            </Link>
            <button
              onClick={() => setDeleteConfirm({ show: true, id: params.id })}
              className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
            >
              <FiTrash2 size={18} className="text-red-500" />
            </button>
          </div>
        )
      },
    },
  ]

  const rows = []

  filteredEvents &&
    filteredEvents.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: "Rs." + item.discountPrice,
        Stock: item.stock,
        sold: item.sold_out,
        startDate: new Date(item.start_Date).toLocaleDateString(),
        endDate: new Date(item.Finish_Date).toLocaleDateString(),
      })
    })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-8 pt-6 mt-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1a2240] flex items-center">
                  <FiCalendar className="mr-2 text-[#3d569a]" /> All Events
                </h2>
                <p className="text-[#334580] mt-1">Manage your promotional events and special offers</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-2 border-[#dce5f3] rounded-lg focus:outline-none focus:border-[#3d569a] transition-colors"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <Link to="/dashboard-create-event">
                  <button className="bg-gradient-to-r from-[#1a2240] to-[#3d569a] text-white px-4 py-2 rounded-lg flex items-center justify-center hover:shadow-md transition-all">
                    <FiPlus className="mr-2" /> Create Event
                  </button>
                </Link>
              </div>
            </div>

            {/* DataGrid */}
            <div className="bg-white rounded-xl shadow-md border border-[#dce5f3] overflow-hidden">
              {rows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="bg-[#f0f4fa] p-4 rounded-full mb-4">
                    <FiCalendar size={32} className="text-[#3d569a]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a2240] mb-2">No Events Found</h3>
                  <p className="text-[#334580] mb-6 text-center max-w-md">
                    {searchTerm
                      ? `No events matching "${searchTerm}"`
                      : "You haven't created any events yet. Create your first event to attract customers with special offers."}
                  </p>
                  <Link to="/dashboard-create-event">
                    <button className="bg-[#3d569a] hover:bg-[#2d3a69] text-white px-6 py-2 rounded-lg flex items-center transition-colors">
                      <FiPlus className="mr-2" /> Create Your First Event
                    </button>
                  </Link>
                </div>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                  className="custom-data-grid"
                />
              )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm.show && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                    <FiTrash2 size={28} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a2240] text-center mb-2">Delete Event</h3>
                  <p className="text-[#334580] text-center mb-6">
                    Are you sure you want to delete this event? This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeleteConfirm({ show: false, id: null })}
                      className="flex-1 py-2 border-2 border-[#dce5f3] rounded-lg font-medium text-[#334580] hover:bg-[#f0f4fa] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(deleteConfirm.id)}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Custom styles for DataGrid */}
          <style jsx global>{`
            .custom-data-grid .MuiDataGrid-root {
              border: none !important;
            }
            .custom-data-grid .MuiDataGrid-columnHeaders {
              background-color: #f0f4fa;
              color: #1a2240;
              font-weight: 600;
            }
            .custom-data-grid .MuiDataGrid-footerContainer {
              background-color: #f0f4fa;
              border-top: none;
            }
            .custom-data-grid .MuiDataGrid-cell {
              border-bottom: 1px solid #f0f4fa;
            }
            .custom-data-grid .MuiDataGrid-row:hover {
              background-color: #f8fafd;
            }
            .custom-data-grid .MuiDataGrid-cell:focus,
            .custom-data-grid .MuiDataGrid-cell:focus-within {
              outline: none !important;
            }
            .custom-data-grid .MuiDataGrid-columnHeader:focus,
            .custom-data-grid .MuiDataGrid-columnHeader:focus-within {
              outline: none !important;
            }
          `}</style>
        </div>
      )}
    </>
  )
}

export default AllEvents
