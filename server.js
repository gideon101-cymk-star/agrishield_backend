import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db.js";

import authRoutes from "./authRoutes.js";
import insuranceRoutes from "./insuranceRoutes.js";
import claimRoutes from "./claimRoutes.js";
import climateRoutes from "./climateRoutes.js";
import riskRoutes from "./riskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // ✅ Needed for USSD POST requests

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/climate", climateRoutes);
app.use("/api/risk", riskRoutes);

// ✅ USSD Endpoint
app.post("/ussd", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";

  if (text === "") {
    response = `CON Welcome to AgriCover
1. Register
2. Check Insurance
3. Submit Claim`;
  } else if (text === "1") {
    response = `CON Enter your name:`;
  } else if (text.startsWith("1*")) {
    const name = text.split("*")[1];
    response = `END Thank you ${name}, registration successful!`;
  } else if (text === "2") {
    response = `END Your insurance cover is active ✅`;
  } else if (text === "3") {
    response = `CON Enter claim details:`;
  } else if (text.startsWith("3*")) {
    const details = text.split("*")[1];
    response = `END Claim submitted: "${details}"`;
  } else {
    response = `END Invalid option.`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
