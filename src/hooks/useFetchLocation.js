import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchLocation(longitude, latitude) {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState();

  const apiKey = import.meta.env.REVERSE_GEOLOCATION_API;

  useEffect(() => {
    async function fetchLocationData() {
      setLocationLoading(true);
      try {
        if (latitude !== null && longitude !== null ) {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
          );
          if (response.data) {
            setCity(response.data.features[0].properties.city);
            setCountry(response.data.features[0].properties.country);
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
