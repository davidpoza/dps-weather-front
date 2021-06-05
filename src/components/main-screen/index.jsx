import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import 'moment/locale/es';
import get from 'lodash.get';
import { useHistory } from 'react-router-dom';
import AlertBar from '../alert-bar';
import SearchForm from '../search-form';
import CurrentConditions from '../current-conditions';
import Webcam from '../webcam';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import Chart from '../chart';
import { fetchCurrentData } from '../../actions/chart-actions';
import { fetchForecast } from '../../actions/forecast-actions';

import OutdoorTempertureWidget from '../widgets/outdoor-temperature';
import IndoorTempertureWidget from '../widgets/indoor-temperature';
import WebcamWidget from '../widgets/webcam';
import TemperatureChart from '../widgets/temperature-chart';
import PressureChart from '../widgets/pressure-chart';

function MainScreen(props) {
  const [state, dispatch] = useContext(Store);
  const [requestCount, setRequestCount] = useState(0);
  const classes = useStyles();

  const makeRequest = () => {
    fetchCurrentData(dispatch, { token: get(state, 'user.token') });
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
        && (!lastRegisteredDate || diff >= 15)) {
        makeRequest();
      }
      fetchForecast(dispatch, { location: 'colmenar-viejo' });
      setRequestCount(requestCount + 1);
    }
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify="center"
      >
        <OutdoorTempertureWidget />
        <WebcamWidget />
        <IndoorTempertureWidget />
        <TemperatureChart />
        <OutdoorTempertureWidget />
        <PressureChart />
        <OutdoorTempertureWidget />
        <OutdoorTempertureWidget />
      </Grid>

    </>
  );
}

export default MainScreen;

MainScreen.propTypes = {
  setFormOpen: PropTypes.func,
};


// return (
//   <>
//     <Grid
//       container
//       spacing={1}
//       alignItems="center"
//       justify="center"
//     >
//       <Grid item xs={12} md={8} xl={3}>
//         <CurrentConditions />
//       </Grid>
//       <Grid item xs={12} md={8} xl={3}>
//         <Webcam />
//       </Grid>
//     </Grid>
//     <Grid
//       container
//       spacing={0}
//       alignItems="center"
//       justify="center"
//       style={{ minHeight: '100vh' }}
//     >
//       <Grid item xs={12} md={8} xl={6}>
//         <Chart
//           data1={state.graph1_points}
//           data2={state.graph2_points}
//           sensor1={state.graph1_sensor || 'HOME_INDOOR'}
//           sensor2={state.graph2_sensor || 'HOME_OUTDOOR'}
//           date1={state.graph1_date}
//           date2={state.graph2_date}
//         />
//         <SearchForm setFormOpen={setFormOpen} />
//         <AlertBar msg={state.msg} error={state.error} />
//       </Grid>
//     </Grid>
//   </>
// );