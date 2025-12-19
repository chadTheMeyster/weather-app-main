import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function useDailyForecastData(weatherData) {
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    if (!weatherData?.daily) {
      return;
    }

    const { time, weather_code, temperature_2m_max, temperature_2m_min } =
      weatherData.daily;

   
    if (!temperature_2m_max || !temperature_2m_min || !weather_code) {
      return;
    }

    
    const combinedData = Array.from(temperature_2m_max).map((_, index) => {
      return {
        day: dayjs(time[index]).format('ddd'),
        weatherCode: weather_code[index],
        maxTemperature: Math.round(temperature_2m_max[index]),
        minTemperature: Math.round(temperature_2m_min[index]),
      };
    });
    
    setDailyForecasts(combinedData);
  }, [weatherData]);

  return { dailyForecasts };
}