import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"

import categoryRoute from "./routes/categoryRoutes.js"
import productRoute from "./routes/productRoute.js"

//configure env
dotenv.config();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//database connection
connectDB();

//routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoute);



app.get("/", (req, res) => {
  res.send({
    message: "welcome to ecomm",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${PORT} in ${process.env.MODE} mode`.bgCyan.white
  );
});
