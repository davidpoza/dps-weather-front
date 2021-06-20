import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import 'moment/locale/es';
import get from 'lodash.get';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import { fetchCurrentData, fetchLogData } from '../../actions/chart-actions';
import { fetchForecast } from '../../actions/forecast-actions';
import { fetch24hComparison } from '../../actions/24h-comparison';
import TempertureWidget from '../widgets/temperature';
import WebcamWidget from '../widgets/webcam';
import TemperatureChartWidget from '../widgets/temperature-chart';
import PressureChartWidget from '../widgets/pressure-chart';
import ForecastWidget from '../widgets/forecast';
import WindChartWidget from '../widgets/wind-chart';
import HumidityChartWidget from '../widgets/humidity-chart';
import RealtimeWidget from '../widgets/realtime';
import WindyWidget from '../widgets/windy';

function MainScreen(props) {
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();
  const token = get(state, 'user.token');
  const sensors = ['HOME_INDOOR', 'HOME_OUTDOOR', 'BEDROOM', 'BEDROOM2'];

  const requestAllSensors = () => {
    fetchCurrentData(dispatch, { token });

    sensors.forEach((id) => {
      fetchLogData(dispatch, {
        sensorId: id,
        date: moment().format('YYYY-MM-DD'),
        token,
      });
      fetch24hComparison(dispatch, { stationId: id, token });
    });
  };

  function makeRequests() {
    const currentDate = moment.tz(new Date(), 'Europe/Madrid');
    const lastRegisteredDate = get(state, 'currentConditions.date');
    const lastRegisteredDateObj = moment.tz(
      lastRegisteredDate, 'DD-MM-YYYY HH:mm:ss', 'Europe/Madrid',
    );
    const diff = currentDate.diff(lastRegisteredDateObj, 'minutes');
    if (get(state, 'user.token') && !get(state, 'loading')
      && (!lastRegisteredDate || diff >= 1)) {
      requestAllSensors();
    }
  }

  useEffect(() => {
    makeRequests();
    setInterval(() => {
      makeRequests();
    }, 2 * 60 * 1000);
  }, []);

  if (!state?.user) return null;
  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={2}
        alignItems="center"
        justify="center"
      >
        <TempertureWidget />
        <WebcamWidget />
        <RealtimeWidget location="colmenar-viejo" />
        <TemperatureChartWidget />
        <ForecastWidget defaultLocation="colmenar-viejo" />
        <PressureChartWidget />
        <WindChartWidget />
        <HumidityChartWidget />
        <WindyWidget />
      </Grid>

    </>
  );
}

export default MainScreen;

MainScreen.propTypes = {
  setFormOpen: PropTypes.func,
};
