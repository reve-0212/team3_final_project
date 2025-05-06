import {useEffect, useState} from "react";

const useGeolocation = () => {
  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurPosition = () => {
    setLocationLoading(true);
    const success = (location) => {
      setCurrentMyLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      setLocationLoading(false);
    }

    const error = () => {
      setCurrentMyLocation({lat: 37.5666103, lng: 126.9783882})
      setLocationLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  };

  useEffect(() => {
    getCurPosition();
  }, []);

  return {currentMyLocation, locationLoading, getCurPosition}
}

export default useGeolocation;