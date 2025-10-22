import express from "express";
import { calculateRisk } from "./riskController.js";
const router = express.Router();

router.post("/", calculateRisk);

export default router;
