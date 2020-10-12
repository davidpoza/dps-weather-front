import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-timezone';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  faTemperatureLow, faTemperatureHigh, faWind, faTint, faSignal,
} from '@fortawesome/free-solid-svg-icons';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';
import { fetchCurrentData } from '../../actions/chart-actions';
import { getCurrentDate } from '../helpers/utils';

function CurrentConditions(props) {
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();

  const makeRequest = () => {
    fetchCurrentData(dispatch, { token: get(state, 'user.token') });
  };

  useEffect(() => {
    const currentDate = moment().tz('Europe/Madrid', new Date());
    const lastRegisteredDate = moment().tz(
      get(state, 'currentConditions.date'), 'DD-MM-YYYY HH:mm:ss', 'Europe/Madrid',
    );
    const diff = currentDate.diff(lastRegisteredDate, 'minutes');
    if (get(state, 'user.token') && !get(state, 'loading')
      && (!lastRegisteredDate || diff >= 15)) {
      makeRequest();
    }
  });
  const {
    indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body1" className={classes.data}>
          <FontAwesomeIcon icon={faTemperatureLow} className={classes.icon} />
          { `${indoorTemp} °` }
        </Typography>
        <Typography variant="body1">
          Temperatura int:
        </Typography>
        <Typography variant="body1" className={classes.data}>
          <FontAwesomeIcon icon={faTemperatureLow} className={classes.icon} />
          { `${outdoorTemp} °` }
        </Typography>
        <Typography variant="body1">
          Temperatura ext:
        </Typography>
        <Typography variant="body1" className={classes.data}>
          <FontAwesomeIcon icon={faTint} className={classes.icon} />
          { `${indoorHum}%` }
        </Typography>
        <Typography variant="body1">
          Humedad int:
        </Typography>
        <Typography variant="body1" className={classes.data}>
          <FontAwesomeIcon icon={faTint} className={classes.icon} />
          { `${outdoorHum}%` }
        </Typography>
        <Typography variant="body1">
          Humedad ext:
        </Typography>
        <Typography variant="body1" className={classes.data}>
          <FontAwesomeIcon icon={faWind} className={classes.icon} />
          { `${wind} Km/h.` }
        </Typography>
        <Typography variant="body1">
          Viento:
        </Typography>
        <Typography variant="body1" className={classes.data}>
          <FontAwesomeIcon icon={faSignal} className={classes.icon} />
          { `${pressure} mbar.` }
        </Typography>
        <Typography variant="body1">
          Presión atmosférica:
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CurrentConditions;

CurrentConditions.propTypes = {

};
