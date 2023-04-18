import { useState } from "react";
import { useEffect } from "react";
const API_KEY = "84889a2c5a1048269bf30740231704";
const QUERY = "Brisbane";
export function useWeather() {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getForecastByQuery(QUERY)
      .then((headlines) => {
        setHeadlines(headlines);
      })
      .catch((e) => {
        setError(e);
      }) // wait 2 seconds before loading is finished
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    headlines,
    error,
  };
}

function getForecastByQuery(q) {
  const url = `https://api.weatherapi.com/v1/forecast.json?q=${q}&key=${API_KEY}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.forecast.forecastday[0].hour)
    .then((forecasts) =>
      forecasts.map((forecast) => ({
        time: forecast.time,
        text: forecast.condition.text,
        temp: forecast.temp_c,
        wind: forecast.wind_kph,
      }))
    );
}
