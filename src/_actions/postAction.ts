"use server";

import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";

// GET handler to fetch all products
export async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find().lean();
    return { data: products };
  } catch (error: any) {
    return { error: error.message, status: "ERROR" };
  }
}

// POST handler to create a new product
export async function createProduct(body: {
  name: string;
  price: number;
  description?: string;
}) {
  try {
    await dbConnect();

    if (!body.name || !body.price) {
      return { error: "Name and price are required", status: "ERROR" };
    }

    const newProduct = new Product({
      name: body.name,
      price: body.price,
      description: body.description || "",
    });

    const savedProduct = await newProduct.save();
    return { data: savedProduct, status: "SUCCESS" };
  } catch (error: any) {
    return { error: error.message, status: "ERROR" };
  }
}

// DELETE handler to delete a product by ID
export async function deleteProduct(body: { id: string }) {
  try {
    await dbConnect();

    if (!body.id) {
      return { error: "Product ID is required", status: "ERROR" };
    }

    const deletedProduct = await Product.findByIdAndDelete(body.id);

    if (!deletedProduct) {
      return { error: "Product not found", status: "ERROR" };
    }

    return { data: deletedProduct, status: "SUCCESS" };
  } catch (error: any) {
    return { error: error.message, status: "ERROR" };
  }
}
