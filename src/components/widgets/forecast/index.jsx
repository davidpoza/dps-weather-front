import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureLow, faClock, faWind, faTint, faSignal, faHandHoldingWater, faHome, faMale,
  faAngleDown, faAngleUp, faAngleRight, faSun, faMoon, faThermometerQuarter,
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import TrendIcon from '../../trend-icon';
import {
  capitalizeFirstWords, getLocaleDate, calculateTrend, filterArrayObjects, calculateTHWIndex,
} from '../../helpers/utils';
import DayForecast from './_children/day';

export default function ForecastWidget({ location }) {
  const [forecast, setForecast] = useState([]);
  const classes = useStyles();
  const enppoint = `https://tiempo.davidinformatico.com/forecast/${location}.json`;
  const [state, dispatch] = useContext(Store);
  const {
    date, indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }

  async function requestForecast() {
    try {
      const res = await fetch(enppoint);
      const data = await res.json();
      return data;
    } catch (Error) {
      console.log('Error during forecast fetch', Error);
      return ([]);
    }
  }

  useEffect(() => {
    (async () => {
      setForecast(await requestForecast());
    })();
  }, []);

  return (
    <WidgetBase title={`Pronóstico 5 días para ${capitalizeFirstWords(location.replace('-', ' '))}`}>
      <div className={classes.root}>
        {
          forecast?.data?.map((f) => (
            <DayForecast
              code={f?.['weather_code']?.value}
              date={f?.['observation_time']?.value}
              maxT={f?.temp?.[1]?.max?.value}
              minT={f?.temp?.[0]?.min?.value}
              precipitation={f?.precipitation?.[0]?.max?.value}
              wind={f?.wind_speed?.[1]?.max?.value}
            />
          ))
        }
      </div>
      <div className={classes.updated}>
        <Typography variant="caption">
          <FontAwesomeIcon icon={faClock} />
          { ` Actualizado en: ${getLocaleDate(forecast.ts)}` }
        </Typography>
      </div>
    </WidgetBase>
  );
}
