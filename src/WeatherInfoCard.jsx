
export function WeatherInfoCard({weatherData, isImperial}) {

  const weatherCardInfo = [
  {
    attribute: "Feels like",
    data: isImperial ? Math.round(((weatherData?.current?.apparent_temperature)*(9/5)) + 32)+'°' : Math.round(weatherData?.current?.apparent_temperature)+'°' ,
    ID:'001'
  },
  {
    attribute: "Humidity",
    data: Math.round(weatherData?.current?.relative_humidity_2m) + '%' ?? "-",
    ID:'002'
  },
  {
    attribute: "Wind",
    data: isImperial ? Math.round(weatherData?.current?.wind_speed_10m * 0.621371) + "mph" : Math.round(weatherData?.current?.wind_speed_10m) + 'kph',
    ID:'003'
  },
  {
    attribute: "Precipitation",
    data: isImperial ? Math.round(weatherData?.current?.precipitation * 0.0393701) + "in" : Math.round(weatherData?.current?.precipitation) + "mm" ,
    ID:'004'
  },
];

  return weatherCardInfo.map((cardInfo) => {
    return (
      <div key={cardInfo.ID} className="bg-Neutral-800 p-6 rounded-2xl">
        <div className="text-2xl text-Neutral-300">{cardInfo.attribute}</div>
        <div className="text-5xl text-Neutral-200 mt-6">{cardInfo.data}</div>
      </div>
    );
  });
}
