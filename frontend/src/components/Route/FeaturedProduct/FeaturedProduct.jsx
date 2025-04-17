import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { server } from "../../../server";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${server}/product/get-all-products`);
        // Optional: pick top 10 or filter by featured tag if available
        const featured = response.data.products.slice(0, 10); // you can change limit as needed
        setProducts(featured);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No featured products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
