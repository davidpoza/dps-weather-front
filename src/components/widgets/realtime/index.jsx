import React, { useContext, useState, useEffect } from 'react';
import TabContext from '@material-ui/lab/TabContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import { transformDateToLocaleDay, getCESTTime } from '../../helpers/utils';

import api from '../../../api/index';
import AirTab from './_children/air/index';
import CloudsTab from './_children/clouds/index';
import AstroTab from './_children/astro/index';
import HoursTab from './_children/hours/index';

export default function RealtimeWidget({ location }) {
  const [state, dispatch] = useContext(Store);
  const [realtimeData, setRealtimeData] = useState();
  const { wind } = state.currentConditions;
  const classes = useStyles();

  const [tab, setTab] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  async function makeRequest() {
    const res = await api.weather.getForecast(location);
    setRealtimeData(await res.json());
  }

  useEffect(() => {
    (async () => {
      await makeRequest();
    })();
    setInterval(async () => {
      await makeRequest();
    }, 2 * 60 * 1000);
  }, []);

  const visibility = realtimeData?.data?.current?.visibility;
  const uvi = realtimeData?.data?.current?.uvi;
  const cloudCover = realtimeData?.data?.current?.['cloud_cover'];
  const windSpeed = realtimeData?.data?.current?.['wind_speed'] || 0;
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
        </Tabs>
        <AstroTab
          value="1"
          moonPhase={moonPhase}
          sunrise={sunrise}
          sunset={sunset}
          moonrise={moonrise}
          moonset={moonset}
        />
        <AirTab value="2" pollenWeed={pollenWeed} pollenTree={pollenTree} pollenGrass={pollenGrass} />
        <HoursTab value="3" data={hourly} />
        <CloudsTab
          value="4"
          windDirection={windDirection}
          windSpeed={windSpeed}
          ts={realtimeData?.ts}
          cloudCover={cloudCover}
          visibility={visibility}
          uvi={uvi}
        />
      </TabContext>
    </WidgetBase>
  );
}
