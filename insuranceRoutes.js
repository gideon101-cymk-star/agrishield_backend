import express from "express";
import { getAllPlans, addPlan } from "./insuranceController.js";
const router = express.Router();

router.get("/", getAllPlans);
router.post("/", addPlan);

export default router;
