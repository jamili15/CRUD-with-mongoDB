"use server";

import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";

export async function getPosts() {
  try {
    await dbConnect();
    const data = await Product.find().lean();

    if (!data) {
      throw new Error("Error!");
    } else {
      return { data };
    }
  } catch (error: any) {
    return { error: error.message, status: "ERROR" };
  }
}
