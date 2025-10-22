import Insurance from "./Insurance.js";

export const getAllPlans = async (req, res) => {
  const plans = await Insurance.find();
  res.json(plans);
};

export const addPlan = async (req, res) => {
  const plan = await Insurance.create(req.body);
  res.json({ msg: "Plan added", plan });
};
