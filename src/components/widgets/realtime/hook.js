import { useContext, useState, useEffect, useCallback } from 'react';
import Store from 'reducers/store';
import api from '../../../api/index';

export default function useRealtime(location) {
  const [state] = useContext(Store);
  const [realtimeData, setRealtimeData] = useState();
  const [madridPollutionScene, setMadridPollutionScene] = useState();
  const { wind: windSpeed } = state.currentConditions;

  const [tab, setTab] = useState('1');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const makeRequest = useCallback(async () => {
    const res = await api.weather.getForecast(location);
    const resPollutionScene = await api.pollution.getMadridScene();
    setMadridPollutionScene(await resPollutionScene.json());
    setRealtimeData(await res.json());
  }, [location, setMadridPollutionScene, setRealtimeData]);

  useEffect(() => {
    (async () => {
      await makeRequest();
    })();
    setInterval(async () => {
      await makeRequest();
    }, 2 * 60 * 1000);
  }, [makeRequest]);

  const visibility = realtimeData?.data?.current?.visibility;
  const uvi = realtimeData?.data?.current?.uvi;
  const cloudCover = realtimeData?.data?.current?.['cloud_cover'];
  // const windSpeed = realtimeData?.data?.current?.['wind_speed'] || 0;
  const windDirection = realtimeData?.data?.current?.['wind_direction'] || 0;
  const sunrise = realtimeData?.data?.current?.sunrise * 1000;
  const sunset = realtimeData?.data?.current?.sunset * 1000;
  const pollenWeed = realtimeData?.data?.pollen?.weedIndex;
  const pollenTree = realtimeData?.data?.pollen?.treeIndex;
  const pollenGrass = realtimeData?.data?.pollen?.grassIndex;
  const hourly = realtimeData?.data?.['hourly_forecast'];
  const moonPhase = realtimeData?.data?.['daily_forecast']?.[0]?.['moon_phase'];
  const moonrise = realtimeData?.data?.['daily_forecast']?.[0]?.['moonrise'] * 1000;
  const moonset = realtimeData?.data?.['daily_forecast']?.[0]?.['moonset'] * 1000;
  const textForecast = realtimeData?.data?.textForecast;
  const ts = realtimeData?.ts;

  return {
    cloudCover,
    handleTabChange,
    hourly,
    madridPollutionScene,
    moonPhase,
    moonrise,
    moonset,
    pollenGrass,
    pollenTree,
    pollenWeed,
    sunrise,
    sunset,
    tab,
    textForecast,
    ts,
    uvi,
    visibility,
    windDirection,
    windSpeed,
  };
}
