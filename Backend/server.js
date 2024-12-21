import express, { request, Router } from "express";
import { connectDB } from "./config/db.js";
import dotenv from  "dotenv";
import productRouter from "./Route/product.route.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const port=process.env.PORT || 3000;

app.use(express.json());
app.use("/api/products",productRouter);

app.listen(port, ()=>{
    connectDB();
    console.log("Server is running on Port ",port);
});

