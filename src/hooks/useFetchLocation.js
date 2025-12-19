import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchLocation(longitude, latitude) {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchLocationData() {
      setLocationLoading(true);
      try {
        if (latitude !== null && longitude !== null ) {
          const response = await axios.get(
            `https://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&username=chad04`
          );
          if (response.data) {
            setCity(response.data.geonames[0].toponymName);
            setCountry(response.data.geonames[0].countryName);
          }
        }
      } catch (e) {
        setError(e);
      } finally {
        setLocationLoading(false);
      }
    }

    fetchLocationData();
  }, [latitude, longitude]);

  return { locationLoading, error, city, country };
}
