import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import authRoutes from "./authRoutes.js";
import insuranceRoutes from "./insuranceRoutes.js";
import claimRoutes from "./claimRoutes.js";
import climateRoutes from "./climateRoutes.js";
import riskRoutes from "./riskRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/climate", climateRoutes);
app.use("/api/risk", riskRoutes);

const PORT = process.env.PORT || 5000;





app.listen(5000, () => console.log('Server running on port 5000'));
