import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

// GET handler to fetch all products
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST handler to create a new product
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }
    const newProduct = new Product({
      name: body.name,
      price: body.price,
      description: body.description || "",
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE handler to delete a product by ID
export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(body.id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// EDIT handler to update a product by ID
export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body.id || (!body.name && !body.price && !body.description)) {
      return NextResponse.json(
        { error: "Product ID and at least one field to update are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      body.id,
      {
        ...(body.name && { name: body.name }),
        ...(body.price && { price: body.price }),
        ...(body.description && { description: body.description }),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
