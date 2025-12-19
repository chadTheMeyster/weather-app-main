import { useEffect, useState } from "react"

export function useHourlyForecastData(weatherData) {
  const [ hourlyForecasts, setHourlyForecasts ] = useState([]);

  useEffect(() => {

    if (weatherData?.hourly){
      const { temperature_2m, time, weather_code } = weatherData.hourly;

      const combinedData = Array.from(temperature_2m).map( (_, index) => {
        return{
          temperature: temperature_2m[index],
          time: time[index],
          weatherCode: weather_code[index]
        }
      });

      setHourlyForecasts(combinedData);
    }

    

  }, [weatherData]);

return {hourlyForecasts}
}