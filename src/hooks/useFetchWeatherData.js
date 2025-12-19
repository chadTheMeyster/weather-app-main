import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

export function useFetchWeatherData(latitude, longitude) {
  const [weatherData, setWeatherData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function getWeatherData() {
      setDataLoading(true);

      try {
        const params = {
          latitude: latitude,
          longitude: longitude,
          hourly: [
            "weather_code",
            "temperature_2m",
          ],
          daily: ["weather_code","temperature_2m_max", "temperature_2m_min"],
          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "precipitation",
            "wind_speed_10m",
          ],
          timezone: "auto",
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        if (!responses || responses.length === 0) {
          console.error("No weather data returned.");
          return;
        }
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current();
        const daily = response.daily();
        const hourly = response.hourly();

        const processedWeatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0).value(),
            relative_humidity_2m: current.variables(1).value(),
            apparent_temperature: current.variables(2).value(),
            is_day: current.variables(3).value(),
            precipitation: current.variables(4).value(),
            wind_speed_10m: current.variables(5).value(),
          },
          daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
    weather_code: daily.variables(0).valuesArray(),
		temperature_2m_max: daily.variables(1).valuesArray(),
		temperature_2m_min: daily.variables(2).valuesArray(),
	},
          hourly: {
            time: Array.from(
              {
                length:
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                  hourly.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(hourly.time()) +
                    i * hourly.interval() +
                    utcOffsetSeconds) *
                    1000
                )
            ),
            weather_code: hourly.variables(0).valuesArray(),
            temperature_2m: hourly.variables(1).valuesArray()
          },
        };
        setWeatherData(processedWeatherData);
      } finally {
        setDataLoading(false);
      }
    }

    getWeatherData();
  }, [latitude, longitude]);

  return { dataLoading, weatherData };
}
