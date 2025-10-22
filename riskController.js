export const calculateRisk = (req, res) => {
  const { rainfall, temperature, soilQuality } = req.body;
  const risk = (100 - soilQuality) + (temperature > 30 ? 10 : 0) + (rainfall < 50 ? 20 : 0);
  res.json({ riskScore: risk });
};
