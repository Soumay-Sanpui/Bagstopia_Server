import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.routes.js";
import ctdb from "./utils/db.util.js";
import { configDotenv } from "dotenv";

configDotenv({
    path: "./.env"
});

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
ctdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is live at : http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});