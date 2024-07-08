"use client";

import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const page = () => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");

      //   if (!res.ok) {
      //     throw new Error("Failed to fetch products");
      //   }
      const products: Product[] = await res.json();
      console.log("RES", products);
    } catch (error: any) {
      console.error(error);
    }
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setName("Jamili");
    setPrice(200);
    fetchProducts();
  }, []);

  return <div></div>;
};

export default page;
