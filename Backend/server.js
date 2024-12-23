import express, { request, Router } from "express";
import { connectDB } from "./config/db.js";
import dotenv from  "dotenv";
import productRouter from "./Route/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());

const port=process.env.PORT || 3000;
const __dirname=path.resolve();

app.use(express.json());
app.use("/api/products",productRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "Frontend_test1/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend_test1", "dist", "index.html"));
    });
}


app.listen(port, ()=>{
    connectDB();
    console.log("Server is running on Port ",port);
});

