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
import Index from './_children/index/index';
import api from '../../../api/index';
import AirTab from './_children/air/index';
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
  const hourly = realtimeData?.data?.hourly_forecast;

  const Extended = () => (
    <div>
      <div className={classes.visibility}>
        Visibilidad:
        <br />
        <strong>
          {` ${(visibility / 1000)?.toFixed(2)}Km.`}
        </strong>
      </div>
      <div className={classes.cloudCover}>
        Cobertura de nubes:
        <br />
        <strong>
          {` ${cloudCover?.toFixed(2)}%.`}
        </strong>
      </div>
      <div className={classes.radiation}>
        Radiación ultravioleta:
        <br />
        <strong>
          {` ${uvi?.toFixed(2)}`}
        </strong>
      </div>
      <div className={classes.radiation}>
        <FontAwesomeIcon icon={faSun} />
        {`${sunrise ? getCESTTime(sunrise) : ''} `}
        <FontAwesomeIcon icon={faMoon} />
        {`${sunset ? getCESTTime(sunset) : ''}`}
      </div>
      <div className={classes.pollen}>
        Polen maleza
        <Index key="pollenWeed" value={pollenWeed} max={5} />
      </div>
      <div className={classes.pollen}>
        Polen hierba
        <Index key="pollenGrass" value={pollenGrass} max={5} />
      </div>
      <div className={classes.pollen}>
        Polen árboles
        <Index key="pollenTree" value={pollenTree} max={5} />
      </div>
    </div>
  );

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
        <AirTab value="2" windDirection={windDirection} windSpeed={windSpeed} />
        <HoursTab value="3" data={hourly} />
      </TabContext>
    </WidgetBase>
  );
}
