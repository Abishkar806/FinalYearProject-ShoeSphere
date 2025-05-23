import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreate from "../components/Shop/ShopCreate";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller,seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true && seller && seller._id) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, navigate, seller]);
  
  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage