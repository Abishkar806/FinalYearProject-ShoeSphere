import React from "react"
import { useState, useEffect } from "react"
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"
import { useDispatch, useSelector } from "react-redux"
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist"
import { addTocart } from "../../../redux/actions/cart"
import { toast } from "react-toastify"
import Ratings from "../../Products/Ratings"

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist)
  const { cart } = useSelector((state) => state.cart)
  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [wishlist, data._id])

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  const addToWishlistHandler = (data) => {
    setClick(!click)
    dispatch(addToWishlist(data))
  }

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id)
    if (isItemExists) {
      toast.error("Item already in cart!")
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!")
      } else {
        const cartData = { ...data, qty: 1 }
        dispatch(addTocart(cartData))
        toast.success("Item added to cart successfully!")
      }
    }
  }

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer hover:shadow-md transition-all duration-300">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt={data.name || "Product"}
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name} text-[#3d569a]`}>{data.shop.name}</h5>
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500] text-[#1a2240]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice} text-[#333]`}>
                Rs.{data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
              </h5>
              <h4 className={`${styles.price} text-[#d55b45]`}>Rs.{data.originalPrice ? data.originalPrice : null}</h4>
            </div>
            <span className="font-[400] text-[17px] text-[#3d569a]">{data?.sold_out} sold</span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 transition-transform hover:scale-110"
              onClick={() => removeFromWishlistHandler(data)}
              color="red"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 transition-transform hover:scale-110"
              onClick={() => addToWishlistHandler(data)}
              color="#3d569a"
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14 transition-transform hover:scale-110"
            onClick={() => setOpen(!open)}
            color="#3d569a"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24 transition-transform hover:scale-110"
            onClick={() => addToCartHandler(data._id)}
            color="#3d569a"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  )
}

export default ProductCard
