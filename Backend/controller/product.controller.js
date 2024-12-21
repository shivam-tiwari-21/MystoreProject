import Product from "../models/product.model.js";
import mongoose from "mongoose";

export  const getProduct =async (req,res) => {
    try {
        const products=await Product.find({});
        res.status(200).json({success:true,data:products})
    } catch (error) {
        console.error("Error in finding products",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
};

export const createProduct= async (request,response)=>{
    const product=request.body;
    if (!product.name || !product.price || !product.image){
        return response.status(400).json({success:false, messsage:"Please fill all the fields" })
    }
    const newProduct= new Product(product);
    try {
        await newProduct.save();
        response.status(201).json({success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Creating new Product: ",error.messsage);
        response.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteProduct =async (request,response)=>{
    const {id}=request.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Please provide a valid id"});
    }
    try {
        await Product.findByIdAndDelete(id);
        response.status(200).json({success:true, message:"Product Deleted"});
    } catch (error) {
       response.status(500).json({success:false, message:"Server Error"}); 
    }
};

export const updateProduct=async (req,res)=>{
    const {id}=req.params;
    const product=req.body;
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"Please provide a valid id"});
}

    try {
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
    }
};