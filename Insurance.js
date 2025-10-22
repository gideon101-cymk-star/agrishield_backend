import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  planName: String,
  description: String,
  premium: Number,
  coverage: String
});

export default mongoose.model("Insurance", insuranceSchema);
