import dayjs from "dayjs";

export function HourlyForecastCard({ hourlyForecasts, day }) {
  return hourlyForecasts.map((hourlyForecast) => {
    if (day === dayjs(hourlyForecast.time).format("ddd")) {
      const weatherCode = hourlyForecast.weatherCode;
      return (
        <div
          key={hourlyForecast.time}
          className="w-full flex justify-between items-center bg-Neutral-600 mt-5 p-4 rounded-2xl"
        >
          <div className="flex items-center">
            <img
              src={
                weatherCode === 0
                  ? "./images/icon-sunny.webp"
                  : weatherCode === 1 || weatherCode === 2
                  ? "./images/icon-partly-cloudy.webp"
                  : weatherCode === 3
                  ? "./images/icon-overcast.webp"
                  : weatherCode === 45 || weatherCode === 48
                  ? "./images/icon-fog.webp"
                  : weatherCode === 51 ||
                    weatherCode === 53 ||
                    weatherCode === 55 ||
                    weatherCode === 56 ||
                    weatherCode === 57
                  ? "./images/icon-drizzle.webp"
                  : weatherCode === 61 ||
                    weatherCode === 63 ||
                    weatherCode === 65 ||
                    weatherCode === 66 ||
                    weatherCode === 67 ||
                    weatherCode === 80 ||
                    weatherCode === 81 ||
                    weatherCode === 82
                  ? "./images/icon-rain.webp"
                  : weatherCode === 71 ||
                    weatherCode === 73 ||
                    weatherCode === 75 ||
                    weatherCode === 77 ||
                    weatherCode === 85 ||
                    weatherCode === 86
                  ? "./images/icon-snow.webp"
                  : weatherCode === 95 ||
                    weatherCode === 96 ||
                    weatherCode === 99
                  ? "./images/icon-storm.webp"
                  : "-"
              }
              alt="hourly weather icon"
              className="h-12"
            />
            <div className="text-2xl ml-3">
              {dayjs(hourlyForecast.time).format("h A")}
            </div>
          </div>

          <div className="text-2xl">
            {Math.round(hourlyForecast.temperature) + "°"}
          </div>
        </div>
      );
    }
  });
}
