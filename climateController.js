import fetch from "node-fetch";

export const getWeather = async (req, res) => {
  const city = req.query.city || "Nairobi";
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
};
