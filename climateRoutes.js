import express from "express";
import { getWeather } from "./climateController.js";
const router = express.Router();

router.get("/", getWeather);

export default router;
