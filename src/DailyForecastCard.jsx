export function DailyForecastCard({dailyForecasts}) {

  return dailyForecasts.map( (dailyForecast) => {
    const {weatherCode} = dailyForecast;
    return(
      <div key={dailyForecast.day} className="bg-Neutral-800 p-4 text-2xl rounded-2xl">
        <div className="text-center">{dailyForecast.day}</div>
        <img src={weatherCode === 0 ? './images/icon-sunny.webp' :
          weatherCode === 1 || weatherCode === 2 ? './images/icon-partly-cloudy.webp' :
          weatherCode === 3 ? './images/icon-overcast.webp' :
          weatherCode === 45 || weatherCode === 48 ? './images/icon-fog.webp' :
          weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 56 || weatherCode === 57 ? './images/icon-drizzle.webp':
          weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 66 || weatherCode === 67 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82 ? './images/icon-rain.webp' :
          weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77 || weatherCode === 85 || weatherCode === 86 ? './images/icon-snow.webp' :
          weatherCode === 95 || weatherCode === 96 || weatherCode === 99 ? './images/icon-storm.webp' : '-'
        } alt="weather condition icon"/>
        <div className="flex justify-between">
          <div className="text-Neutral-200">{dailyForecast.maxTemperature +'°'}</div>
          <div className="text-Neutral-300">{dailyForecast.minTemperature +'°'}</div>
        </div>
      </div>
    )
  });
}
