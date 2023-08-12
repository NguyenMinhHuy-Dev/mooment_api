const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser"); 
const multer = require("multer");
const upload = multer();

const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const collectionRoute = require("./routes/collectionRoute");
const brandRoute = require("./routes/brandRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");

const dotenv = require("dotenv");
dotenv.config();

const connectToMongoDB = require("./config/mongodb");
connectToMongoDB(process.env.MONGODB_URL);

const app = express();
app.use(express.json({ limit:"50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(upload.any());
app.use(cors());
app.use(morgan("common"));

app.use("/v1/products", productRoute);
app.use("/v1/categories", categoryRoute);
app.use("/v1/collections", collectionRoute);
app.use("/v1/brands", brandRoute);
app.use("/v1/auth", authRoute);
app.use("/v1/users", userRoute); 
app.use("/v1/orders", orderRoute);

app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at port ${process.env.PORT}!`);
});