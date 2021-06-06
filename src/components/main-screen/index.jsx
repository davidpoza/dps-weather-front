import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import 'moment/locale/es';
import get from 'lodash.get';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import { fetchCurrentData, fetchLogData  } from '../../actions/chart-actions';
import { fetchForecast } from '../../actions/forecast-actions';

import OutdoorTempertureWidget from '../widgets/outdoor-temperature';
import IndoorTempertureWidget from '../widgets/indoor-temperature';
import WebcamWidget from '../widgets/webcam';
import TemperatureChartWidget from '../widgets/temperature-chart';
import PressureChartWidget from '../widgets/pressure-chart';
import ForecastWidget from '../widgets/forecast';
import WindChartWidget from '../widgets/wind-chart';
import HumidityChartWidget from '../widgets/humidity-chart';

function MainScreen(props) {
  const [state, dispatch] = useContext(Store);
  const [requestCount, setRequestCount] = useState(0);
  const classes = useStyles();

  const sensors = ['HOME_INDOOR', 'HOME_OUTDOOR', 'BEDROOM', 'BEDROOM2'];

  const makeRequest = () => {
    fetchCurrentData(dispatch, { token: get(state, 'user.token') });
    fetchLogData(dispatch, {
      sensorId: 'HOME_INDOOR',
      date: moment().format('YYYY-MM-DD'),
      token: get(state, 'user.token'),
    });

    sensors.forEach((s) => {
      fetchLogData(dispatch, {
        sensorId: s,
        date: moment().format('YYYY-MM-DD'),
        token: get(state, 'user.token'),
      });
    });
  };

  useEffect(() => {
    if (requestCount === 0) {
      const currentDate = moment.tz(new Date(), 'Europe/Madrid');
      const lastRegisteredDate = get(state, 'currentConditions.date');
      const lastRegisteredDateObj = moment.tz(
        lastRegisteredDate, 'DD-MM-YYYY HH:mm:ss', 'Europe/Madrid',
      );
      const diff = currentDate.diff(lastRegisteredDateObj, 'minutes');
      if (get(state, 'user.token') && !get(state, 'loading')
        && (!lastRegisteredDate || diff >= 1)) {
        makeRequest();
      }
      fetchForecast(dispatch, { location: 'colmenar-viejo' });
      setRequestCount(requestCount + 1);
    }
  }, []);

  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={2}
        alignItems="center"
        justify="center"
      >
        <OutdoorTempertureWidget />
        <WebcamWidget />
        <IndoorTempertureWidget />
        <TemperatureChartWidget />
        <ForecastWidget location="colmenar-viejo" />
        <PressureChartWidget />
        <WindChartWidget />
        <HumidityChartWidget />
        <ForecastWidget location="penalara" />
      </Grid>

    </>
  );
}

export default MainScreen;

MainScreen.propTypes = {
  setFormOpen: PropTypes.func,
};
