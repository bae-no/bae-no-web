import { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState(
    {} as { latitude: number; longitude: number },
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  }, []);

  return location;
};

export default useCurrentLocation;
