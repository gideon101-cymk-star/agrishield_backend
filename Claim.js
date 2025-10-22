import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cropType: String,
  description: String,
  status: { type: String, default: "Pending" }
});

export default mongoose.model("Claim", claimSchema);
