import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";

const router =express.Router();

router.get("/",getProduct);
router.post("/",createProduct);
router.delete("/:id",deleteProduct );
router.put("/:id",updateProduct);

export default router;