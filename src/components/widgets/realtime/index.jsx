import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import TabContext from '@material-ui/lab/TabContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Store from 'reducers/store';
import WidgetBase from '../base';
import useStyles from './useStyles';
import api from '../../../api/index';
import AirTab from './_children/air/index';
import CloudsTab from './_children/clouds/index';
import AstroTab from './_children/astro/index';
import HoursTab from './_children/hours/index';
import TextForecastTab from './_children/textForecast/index';

export default function RealtimeWidget({ location }) {
  const [state] = useContext(Store);
  const [realtimeData, setRealtimeData] = useState();
  const [madridPollutionScene, setMadridPollutionScene] = useState();
  const { wind: windSpeed } = state.currentConditions;
  const classes = useStyles();

  const [tab, setTab] = React.useState('1');

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

  return (
    <WidgetBase spaceBetween>
      <TabContext value={tab}>
        <Tabs
          value={tab}
          variant="fullWidth"
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab classes={{ root: classes.tab }} label="Astro" value="1" />
          <Tab classes={{ root: classes.tab }} label="Aire" value="2" />
          <Tab classes={{ root: classes.tab }} label="Avance" value="3" />
          <Tab classes={{ root: classes.tab }} label="Nubes" value="4" />
          <Tab classes={{ root: classes.tab }} label="P.Texto" value="5" />
        </Tabs>
        <AstroTab
          value="1"
          moonPhase={moonPhase}
          sunrise={sunrise}
          sunset={sunset}
          moonrise={moonrise}
          moonset={moonset}
        />
        <AirTab
          value="2"
          pollenWeed={pollenWeed}
          pollenTree={pollenTree}
          pollenGrass={pollenGrass}
          madridPollutionScene={madridPollutionScene?.scene}
          ts={madridPollutionScene?.ts}
        />
        <HoursTab value="3" data={hourly} />
        <CloudsTab
          value="4"
          windDirection={windDirection}
          windSpeed={windSpeed}
          ts={realtimeData?.ts}
          cloudCover={cloudCover}
          visibility={visibility}
          uvi={uvi}
          textForecast={textForecast}
        />
        <TextForecastTab value="5" textForecast={textForecast} />
      </TabContext>
    </WidgetBase>
  );
}

RealtimeWidget.propTypes = {
  location: PropTypes.string,
};
