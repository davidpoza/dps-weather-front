import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'moment/locale/es';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  faTemperatureLow, faClock, faWind, faTint, faSignal, faHandHoldingWater, faHome, faMale,
} from '@fortawesome/free-solid-svg-icons';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';
import { fetchCurrentData } from '../../actions/chart-actions';
import { calculateTHWIndex, calculateDewPoint } from '../helpers/utils';

function CurrentConditions(props) {
  const [state, dispatch] = useContext(Store);
  const [requestCount, setRequestCount] = useState(0);
  const classes = useStyles();

  const makeRequest = () => {
    fetchCurrentData(dispatch, { token: get(state, 'user.token') });
  };

  const getLocaleDate = (date) => {
    const dateObj = moment.tz(date, 'DD-MM-YYYY HH:mm:ss', 'Europe/Madrid');
    return (dateObj.locale('es').format('ddd HH:mm'));
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
        setRequestCount(requestCount + 1);
      }
    }
  }, []);

  const {
    date, indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  const thw = calculateTHWIndex(outdoorTemp, outdoorHum, wind);
  const dewPoint = calculateDewPoint(outdoorTemp, outdoorHum);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container spacing={0}>
          <Grid item xs className={classes.item} title="Temperatura exterior">
            <FontAwesomeIcon icon={faTemperatureLow} className={classes.icon} size="2x" />
            <Typography variant="body1" className={classes.data}>
              { `${outdoorTemp} °` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Humedad exterior">
            <FontAwesomeIcon icon={faTint} className={classes.icon} size="2x" />
            <Typography variant="body1" className={classes.data}>
              { `${outdoorHum}%` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Sensación térmica">
            <div>
              <FontAwesomeIcon icon={faMale} className={classes.icon} size="2x" />
              <FontAwesomeIcon icon={faTemperatureLow} className={classes.icon} size="md" />
            </div>
            <Typography variant="body1" className={classes.data}>
              { `${thw} °` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Temperatura interior">
            <div>
              <FontAwesomeIcon icon={faHome} className={classes.icon} size="2x" />
              <FontAwesomeIcon icon={faTemperatureLow} className={classes.icon} size="md" />
            </div>
            <Typography variant="body1" className={classes.data}>
              { `${indoorTemp} °` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Humedad interior">
            <div>
              <FontAwesomeIcon icon={faHome} className={classes.icon} size="2x" />
              <FontAwesomeIcon icon={faTint} className={classes.icon} size="md" />
            </div>
            <Typography variant="body1" className={classes.data}>
              { `${indoorHum}%` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Velocidad del viento">
            <FontAwesomeIcon icon={faWind} className={classes.icon} size="2x" />
            <Typography variant="body1" className={classes.data}>
              { `${wind} Km/h` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Punto de rocío">
            <FontAwesomeIcon icon={faHandHoldingWater} className={classes.icon} size="2x" />
            <Typography variant="body1" className={classes.data}>
              { `${dewPoint} °` }
            </Typography>
          </Grid>
          <Grid item xs className={classes.item} title="Presión atmosférica">
            <FontAwesomeIcon icon={faSignal} className={classes.icon} size="2x" />
            <Typography variant="body1" className={classes.data}>
              { `${Math.trunc(pressure)}
              mbar` }
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.date}>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faClock} className={classes.icon} />
            { ` Última lectura: ${getLocaleDate(date)}` }
          </Typography>
        </div>
        {/*


        <Typography variant="body1">
          Temperatura int:
        </Typography>
        <Typography variant="body1" className={classes.data}>

          { `${outdoorTemp} ° (THW: ${thw})` }
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
          <FontAwesomeIcon icon={faHandHoldingWater} className={classes.icon} />
          { `${dewPoint} °` }
        </Typography>
        <Typography variant="body1">
          Punto de rocío:
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
        </Typography> */}
      </CardContent>
    </Card>
  );
}

export default CurrentConditions;

CurrentConditions.propTypes = {

};
