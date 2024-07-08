"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const products: Product[] = await res.json();
      setProducts(products);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      const newProduct: Product = await res.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setName("");
      setPrice("");
      setDescription("");
      setSuccess("Product created successfully");
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setSuccess("Product deleted successfully");
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setSuccess(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {products.map((product) => (
        <div key={product._id} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>

          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}

      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
