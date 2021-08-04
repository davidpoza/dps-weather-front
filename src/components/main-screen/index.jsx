import React, { useContext, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import 'moment/locale/es';
import get from 'lodash.get';
import Store from 'reducers/store';
import { fetchCurrentData, fetchLogData } from 'actions/chart-actions';
import { fetch24hComparison } from 'actions/24h-comparison';
import TempertureWidget from 'components/widgets/temperature';
import WebcamWidget from 'components/widgets/webcam';
import TemperatureChartWidget from 'components/widgets/temperature-chart';
import PressureChartWidget from 'components/widgets/pressure-chart';
import ForecastWidget from 'components/widgets/forecast';
import WindChartWidget from 'components/widgets/wind-chart';
import HumidityChartWidget from 'components/widgets/humidity-chart';
import RealtimeWidget from 'components/widgets/realtime';
import WindyWidget from 'components/widgets/windy';
import useStyles from './useStyles';


function MainScreen() {
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();
  const token = get(state, 'user.token');
  const sensors = ['HOME_INDOOR', 'HOME_OUTDOOR', 'BEDROOM', 'BEDROOM2'];

  const requestAllSensors = useCallback(() => {
    fetchCurrentData(dispatch, { token });

    sensors.forEach((id) => {
      fetchLogData(dispatch, {
        sensorId: id,
        date: moment().format('YYYY-MM-DD'),
        token,
      });
      fetch24hComparison(dispatch, { stationId: id, token });
    });
  }, [sensors, dispatch, token]);

  const makeRequests = useCallback(() => {
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
  }, [state, requestAllSensors]);

  useEffect(() => {
    makeRequests();
    setInterval(() => {
      makeRequests();
    }, 2 * 60 * 1000);
  }, [makeRequests]);

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

};
