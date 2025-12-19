import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchLonLan(search) {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [lonLanLoading, setLonLanLoading] = useState(false);
  const [lonLanError, setLonLanError] = useState();

  useEffect(() => {

    function asyncGeoLocation() {
      return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}
    
    if (!search) {
      async function fetchDeviceLonLan() {
        setLonLanLoading(true);
        setLonLanError(null)
        try {
          const position = await asyncGeoLocation();
          if (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          }
        } catch (e) {
          setLonLanError(e);
        } finally {
          setLonLanLoading(false);
        }
      }

      fetchDeviceLonLan();
    } else {
      async function fetchLonLan() {
        setLonLanLoading(true);
        setLonLanError(null)

        try {
          const response = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`
          );
          if (response.data) {
            setLongitude(response.data.results[0].longitude);
            setLatitude(response.data.results[0].latitude);
          }
        } catch (e) {
          setLonLanError(e);
        } finally {
          setLonLanLoading(false);
        }
      }

      fetchLonLan();
    }
  }, [search]);

  return { lonLanLoading, lonLanError, longitude, latitude };
}
