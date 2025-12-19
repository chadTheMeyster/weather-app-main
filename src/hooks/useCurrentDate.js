import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function useCurrentDate(dataLoading, weatherData) {
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    if (!dataLoading && weatherData?.current?.time) {
      const formatted = dayjs(weatherData.current.time).format(
        "dddd, MMM DD, YYYY"
      );
      setCurrentDate(formatted);
    }
  }, [weatherData, dataLoading]);

  return {currentDate};
}
