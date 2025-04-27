import React from "react"
import { useState, useEffect } from "react"
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { server } from "../../server"
import { DataGrid } from "@material-ui/data-grid"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { MdTrackChanges } from "react-icons/md"
import { RxCross1 } from "react-icons/rx"
import { deleteUserAddress, loadUser, updatUserAddress, updateUserInformation } from "../../redux/actions/user"
import { Country, State } from "country-state-city"
import { toast } from "react-toastify"
import axios from "axios"
import { getAllOrdersOfUser } from "../../redux/actions/order"

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user)
  const [name, setName] = useState(user && user.name)
  const [email, setEmail] = useState(user && user.email)
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)
  const [password, setPassword] = useState("")
  const [, setAvatar] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearErrors" })
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch({ type: "clearMessages" })
    }
  }, [error, successMessage, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserInformation(name, email, phoneNumber, password))
  }

  const handleImage = async (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            },
          )
          .then((response) => {
            dispatch(loadUser())
            toast.success("Avatar updated successfully!")
          })
          .catch((error) => {
            toast.error(error)
          })
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}` || "/placeholder.svg"}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3d569a]"
                alt="User Avatar"
              />
              <div className="w-[30px] h-[30px] bg-[#f0f4fa] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] shadow-md hover:bg-[#dce5f3] transition-colors">
                <input type="file" id="image" className="hidden" onChange={handleImage} />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera className="text-[#3d569a]" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#334580] font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-4 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#334580] font-medium">Email Address</label>
                  <input
                    type="text"
                    className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-1 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#334580] font-medium">Phone Number</label>
                  <input
                    type="number"
                    className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-4 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#334580] font-medium">Enter your password</label>
                  <input
                    type="password"
                    className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-4 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-[250px] h-[40px] border border-[#3d569a] text-center text-[#3d569a] rounded-md mt-8 cursor-pointer hover:bg-[#3d569a] hover:text-white transition-colors duration-300 font-medium"
              >
                Update
              </button>
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  )
}

const AllOrders = () => {
  const { user } = useSelector((state) => state.user)
  const { orders } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user._id])

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "text-green-600" : "text-red-600"
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
            <Link to={`/user/order/${params.id}`}>
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
        itemsQty: item.cart.length,
        total: "Rs." + item.totalPrice,
        status: item.status,
      })
    })

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        className="bg-white rounded-xl shadow-md"
      />
    </div>
  )
}

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user)
  const { orders } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user._id])

  const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund")

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "text-green-600" : "text-red-600"
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
            <Link to={`/user/order/${params.id}`}>
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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "Rs." + item.totalPrice,
        status: item.status,
      })
    })

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        className="bg-white rounded-xl shadow-md"
      />
    </div>
  )
}

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user)
  const { orders } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user._id])

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "text-green-600" : "text-red-600"
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
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} className="text-[#3d569a]" />
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
        itemsQty: item.cart.length,
        total: "Rs." + item.totalPrice,
        status: item.status,
      })
    })

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        className="bg-white rounded-xl shadow-md"
      />
    </div>
  )
}

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const passwordChangeHandler = async (e) => {
    e.preventDefault()

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success(res.data.success)
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-semibold text-[#1a2240] pb-2">Change Password</h1>
      <div className="w-full">
        <form onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2 text-[#334580] font-medium">Enter your old password</label>
            <input
              type="password"
              className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-4 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2 text-[#334580] font-medium">Enter your new password</label>
            <input
              type="password"
              className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-4 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2 text-[#334580] font-medium">Enter your confirm password</label>
            <input
              type="password"
              className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 mb-4 800px:mb-0 focus:border-[#3d569a] focus:outline-none"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-[95%] h-[40px] border border-[#3d569a] text-center text-[#3d569a] rounded-md mt-8 cursor-pointer hover:bg-[#3d569a] hover:text-white transition-colors duration-300 font-medium"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Address = () => {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState()
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [addressType, setAddressType] = useState("")
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!")
    } else {
      dispatch(updatUserAddress(country, city, address1, address2, zipCode, addressType))
      setOpen(false)
      setCountry("")
      setCity("")
      setAddress1("")
      setAddress2("")
      setZipCode(null)
      setAddressType("")
    }
  }

  const handleDelete = (item) => {
    const id = item._id
    dispatch(deleteUserAddress(id))
  }

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50">
          <div className="w-[90%] 800px:w-[35%] h-[80vh] bg-white rounded-xl shadow-lg relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer text-[#334580] hover:text-[#1a2240]"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-semibold text-[#1a2240]">Add New Address</h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2 text-[#334580] font-medium">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-2 focus:border-[#3d569a] focus:outline-none"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2 text-[#334580] font-medium">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-2 focus:border-[#3d569a] focus:outline-none"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2 text-[#334580] font-medium">Address 1</label>
                    <input
                      type="address"
                      className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 focus:border-[#3d569a] focus:outline-none"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2 text-[#334580] font-medium">Address 2</label>
                    <input
                      type="address"
                      className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 focus:border-[#3d569a] focus:outline-none"
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2 text-[#334580] font-medium">Zip Code</label>
                    <input
                      type="number"
                      className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-3 focus:border-[#3d569a] focus:outline-none"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2 text-[#334580] font-medium">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border border-[#dce5f3] h-[40px] rounded-md px-2 focus:border-[#3d569a] focus:outline-none"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option className="block pb-2" key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <button
                      type="submit"
                      className="w-[95%] h-[40px] bg-[#3d569a] text-white rounded-md mt-5 cursor-pointer hover:bg-[#2d3a69] transition-colors duration-300 font-medium"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-semibold text-[#1a2240] pb-2">My Addresses</h1>
        <button
          className="bg-[#3d569a] text-white py-2 px-4 rounded-md hover:bg-[#2d3a69] transition-colors duration-300"
          onClick={() => setOpen(true)}
        >
          Add New
        </button>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-lg flex items-center px-3 shadow-md justify-between pr-10 mb-5 border border-[#dce5f3]"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold text-[#1a2240]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset] text-[#334580]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset] text-[#334580]">{user && user.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer text-[#334580] hover:text-red-500 transition-colors"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px] text-[#334580]">You do not have any saved addresses!</h5>
      )}
    </div>
  )
}

export default ProfileContent
