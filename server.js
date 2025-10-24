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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // ✅ Needed for USSD requests
app.use(express.json());

// ✅ Normal API routes
app.use("/api/auth", authRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/climate", climateRoutes);
app.use("/api/risk", riskRoutes);

// ✅ USSD route
app.post("/ussd", (req, res) => {
  console.log("Incoming USSD Request:", req.body); // Logs for Render debugging

  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";

  const textArray = text.split("*");

  if (text === "") {
    response = `CON Welcome to AgriCover
1. Register as a Farmer
2. Check Insurance
3. Submit Claim
4. Weather Updates
5. Farming Advice
6. Contact Support`;
  }

  // ✅ 1. Register
  else if (text === "1") {
    response = "CON Enter your full name:";
  } else if (textArray[0] === "1" && textArray.length === 2) {
    response = "CON Enter your county:";
  } else if (textArray[0] === "1" && textArray.length === 3) {
    response = "END Registration successful! Thank you for joining AgriCover.";
  }

  // ✅ 2. Check Insurance
  else if (text === "2") {
    response = "END Your insurance cover is active ✅";
  }

  // ✅ 3. Submit Claim
  else if (text === "3") {
    response = "CON Enter claim details:";
  } else if (textArray[0] === "3" && textArray.length === 2) {
    const details = textArray[1];
    response = `END Claim submitted successfully.\nDetails: "${details}"`;
  }

  // ✅ 4. Weather Updates
  else if (text === "4") {
    response = "END Today's forecast: Sunny with light rains expected in the evening ☀️🌧️";
  }

  // ✅ 5. Farming Advice
  else if (text === "5") {
    response = "END Tip: Rotate your crops every season to maintain soil fertility 🌾";
  }

  // ✅ 6. Contact Support
  else if (text === "6") {
    response = "END For assistance, call 0700 123 456 or email support@agricover.com 📞";
  }

  // ✅ Invalid Option
  else {
    response = "END Invalid option. Please try again.";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
