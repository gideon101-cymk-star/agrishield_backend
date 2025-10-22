import Claim from "./Claim.js";

export const submitClaim = async (req, res) => {
  const claim = await Claim.create(req.body);
  res.json({ msg: "Claim submitted", claim });
};

export const getClaims = async (req, res) => {
  const claims = await Claim.find();
  res.json(claims);
};
