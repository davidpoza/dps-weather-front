import { useState } from 'react';
import useCachedFetch from 'hooks/useCachedFetch';

const locations = {
  'colmenar-viejo': 'Colmenar Viejo',
  penalara: 'Peñalara',
  'hoyos-del-espino': 'Hoyos del Espino',
  somosierra: 'Somosierra',
};


export default function useForecast(defaultLocation) {
  const [location, setLocation] = useState(defaultLocation);
  const enppoint = `https://tiempo.davidinformatico.com/forecastv2/${location}.json`;
  const [forecast] = useCachedFetch(enppoint);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return {
    forecast,
    handleLocationChange,
    location,
    locations,
  };
}
