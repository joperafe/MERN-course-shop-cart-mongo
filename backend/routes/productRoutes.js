import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // res.status(401);
    // throw new Error("Not authorized");
    res.json(products);
  })
);

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log("params id server", req.params.id, parseInt(req.params.id, 10));
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found :(");
    }
  })
);

export default router;
