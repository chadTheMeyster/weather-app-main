import { DailyForecastCard } from "./DailyForecastCard";
import { useCurrentDate } from "./hooks/useCurrentDate";
import { HourlyForecastCard } from "./HourlyForecastCard";
import { WeatherInfoCard } from "./WeatherInfoCard";
import { useFetchLocation } from "./hooks/useFetchLocation";
import { useState, Activity } from "react";
import { useFetchLonLan } from "./hooks/useFetchLonLan";
import { useFetchWeatherData } from "./hooks/useFetchWeatherData";
import { useDailyForecastData } from "./hooks/useDailyForecastData";
import { useHourlyForecastData } from "./hooks/useHourlyForecastData";
import dayjs from "dayjs";

function App() {
  const [placeName, setPlaceName] = useState("");
  const [search, setSearch] = useState('');
  const [day, setDay] = useState(dayjs().format("ddd"));
  const [ isUnit, setIsUnit ] = useState(false);
  const [ isImperial, setIsImperial ] = useState(false)
  const { longitude, latitude } = useFetchLonLan(search);
  const { locationLoading, error, city, country } = useFetchLocation(
    longitude,
    latitude
  );
  const { dataLoading, weatherData } = useFetchWeatherData(latitude, longitude);
  const { currentDate } = useCurrentDate(dataLoading, weatherData);
  const { dailyForecasts } = useDailyForecastData(weatherData);
  const { hourlyForecasts } = useHourlyForecastData(weatherData);

  console.log(city);

  return (
    <div
      className="bg-Neutral-900 text-white place-items-center p-6 
    md:p-30 md:pt-10"
    >
      <div className="flex justify-between w-full relative">
        <img src="./images/logo.svg" alt="Weather Now Logo" className="h-10" />
        <button
          className="flex justify-between items-center bg-Neutral-800 p-3 rounded-xl w-27"
          onClick={() => {
            if(isUnit){
              setIsUnit(false);
            }else{
              setIsUnit(true);
            }
          }}
        >
          <img src="./images/icon-units.svg" alt="Settings" />
          <div>Units</div>
          <img src="./images/icon-dropdown.svg" alt="Dropdown" />
        </button>

          <Activity mode={isUnit ? 'visible' : 'hidden'}>
            <div
          className={`absolute bg-Neutral-800 right-0 top-16 p-1.5 rounded-xl w-55`}
        >
          <button className="p-2 rounded-xl border-2 w-full text-left border-Neutral-700 hover:border-2 hover:border-white hover:bg-Neutral-700"
          onClick={ () => {
            if (isImperial){
              setIsImperial(false);
            }else{
              setIsImperial(true);
            }
          }}>
            Switch to {isImperial ? 'Metric' : 'Imperial'}
          </button>

          <div className="text-Neutral-300 p-1.5">Temperature</div>
          <div className={isImperial ? 'p-2 rounded-xl hover:bg-Neutral-700' : "p-2 rounded-xl bg-Neutral-700 flex justify-between items-center"}>
            <div>Celsius (°C)</div>
            <img src="./images/icon-checkmark.svg" alt="checkmark" className={isImperial ? 'hidden' : ''}/>
          </div>
          <div className={isImperial ? 'p-2 rounded-xl bg-Neutral-700 flex justify-between items-center' : 'p-2 rounded-xl hover:bg-Neutral-700'}>
            <div>Fahrenheit (°F)</div>
            <img src="./images/icon-checkmark.svg" alt="checkmark" className={isImperial ? '' : 'hidden'}/>
          </div>

          <div className="text-Neutral-300 p-1.5">Wind Speed</div>
          <div className={isImperial ? "p-2 rounded-xl hover:bg-Neutral-700" : "p-2 rounded-xl bg-Neutral-700 flex justify-between items-center"}>
            <div>km/h</div>
            <img src="./images/icon-checkmark.svg" alt="checkmark" className={isImperial ? 'hidden' : ''}/>
          </div>
          <div className={isImperial ? "p-2 rounded-xl bg-Neutral-700 flex justify-between items-center" : "p-2 rounded-xl hover:bg-Neutral-700"}>
            <div>mph</div>
            <img src="./images/icon-checkmark.svg" alt="checkmark" className={isImperial ? '' : 'hidden'}/>
          </div>

          <div className="text-Neutral-300 p-1.5">Precipitation</div>
          <div className={isImperial ? "p-2 rounded-xl hover:bg-Neutral-700" : "p-2 rounded-xl bg-Neutral-700 flex justify-between items-center"}>
            <div>Millimeters (mm)</div>
            <img src="./images/icon-checkmark.svg" alt="checkmark" className={isImperial ? 'hidden' : ''}/>
          </div>
          <div className={isImperial ? "p-2 rounded-xl bg-Neutral-700 flex justify-between items-center" : "p-2 rounded-xl hover:bg-Neutral-700"}>
            <div>Inches (in)</div>
            <img src="./images/icon-checkmark.svg" alt="checkmark" className={isImperial ? '' : 'hidden'}/>
          </div>
        </div>

          </Activity>
        

      </div>

      <h1 className="m-8 text-7xl font-semibold text-center">
        How's the sky looking today?
      </h1>

      <div className="flex w-full items-center justify-between
       md:w-1/2 md:flex md:items-center md:justify-center">
        <div
          className="flex w-full m-6 p-6 bg-Neutral-800 rounded-2xl
          md:m-0 md:w-3/4 md:p-4"
        >
          <img
            src="./images/icon-search.svg"
            alt="search"
            className="mr-6 h-6"
          />
          <input
            type="text"
            placeholder="Search for a place..."
            className="placeholder:text-Neutral-200 placeholder:text-2xl w-full outline-none"
            value={placeName}
            onChange={(event) => {
              setPlaceName(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearch(placeName);
              }
            }}
          />
        </div>

        <button
          className="bg-Blue-500 p-5 text-2xl rounded-2xl pl-10 pr-10 active:bg-Blue-700
        md:w-1/4 md:ml-4 md:p-3"
          onClick={() => {
            setSearch(placeName);
          }}
        >
          Search
        </button>
      </div>
        

        <div className="md:grid md:gap-10 md:items-start md:grid-cols-3">
          {/**contains the weather image, location and date */}
          <div className="md:col-span-2">
            <div className="w-full grid mt-12">
        <img
          src="./images/bg-today-small.svg"
          alt="backgroud image"
          className="w-full col-start-1 col-end-2 row-start-1 row-end-2 md:hidden"
        />
        <img
          src="./images/bg-today-large.svg"
          alt="backgroud image"
          className="w-full col-start-1 col-end-2 row-start-1 row-end-2 md:block"
        />
        <div className="col-start-1 col-end-2 row-start-1 row-end-2 p-18 
        md:flex md:justify-between md:items-center">
          <div>
            <div className="text-4xl text-center font-semibold 
            md:text-left">
            {/**Location */}
            {locationLoading
              ? "Getting location..."
              : error
              ? "Error fetching location"
              : `${city}, ${country}`}
          </div>
          <div className="text-Neutral-300 text-center text-2xl mt-4
          md:text-left">
            {/*currentDate*/}
            {dataLoading ? "" : currentDate}
          </div>
          </div>
          
          <div className="flex justify-between items-center">
            <img
              src="./images/icon-sunny.webp"
              alt="weather"
              className="h-40 -ml-10"
            />
            <div className="text-bold text-9xl">
              {dataLoading
                ? ""
                : isImperial ? Math.round((weatherData?.current?.temperature_2m*9/5)+32) + "°" : Math.round(weatherData?.current?.temperature_2m) + "°" }
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full mt-8
      md:grid-rows-subgrid md:grid-cols-4 md:items-center md:m-0 md:mt-10">
        <WeatherInfoCard weatherData={weatherData} isImperial={isImperial}/>
      </div>

        <h2 className="text-justify w-full mt-10 text-3xl">Daily forecast</h2>

        <div className="grid grid-cols-3 gap-5 w-full mt-8 md:flex md:h-full">
          <DailyForecastCard dailyForecasts={dailyForecasts} isImperial={isImperial}/>
        </div>
          </div>
      

      <div className="bg-Neutral-800 w-full mt-10 p-4 pt-8 rounded-2xl">
        <div className="flex justify-between">
          <div className="text-2xl">Hourly forecast</div>
          <select
            name="days"
            id="days"
            value={day}
            onChange={(event) => {
              setDay(event.target.value);
            }}
            className="bg-Neutral-600 p-3 rounded-2xl"
          >
            <option value="Mon">Monday</option>
            <option value="Tue">Tuesday</option>
            <option value="Wed">Wednesday</option>
            <option value="Thu">Thursday</option>
            <option value="Fri">Friday</option>
            <option value="Sat">Saturday</option>
            <option value="Sun">Sunday</option>
          </select>
        </div>

        <div className="h-200 overflow-y-auto">
          <HourlyForecastCard hourlyForecasts={hourlyForecasts} day={day} isImperial={isImperial} />
        </div>
      </div>
        </div>
      
    </div>
  );
}

export default App;
