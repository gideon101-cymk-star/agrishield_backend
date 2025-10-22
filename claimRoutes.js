import express from "express";
import { submitClaim, getClaims } from "./claimController.js";
const router = express.Router();

router.post("/", submitClaim);
router.get("/", getClaims);

export default router;
