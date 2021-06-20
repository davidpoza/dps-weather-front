import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind, faTint,
} from '@fortawesome/free-solid-svg-icons';
import { formatWeekDay, getWeatherImage } from '../../../helpers/utils';
import useStyles from './useStyles';

export default function DayForecast({
  code, date, maxT, minT, precipitation = 0, probPrecipitation = 0, wind,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.border}>
        <div>
          {date}
        </div>
        <img className={classes.icon} src={getWeatherImage(code)} alt={code} />
      </div>
      <div className={classes.minT}>
        {`${minT} °C`}
      </div>
      <div className={classes.maxT}>
        {`${maxT} °C`}
      </div>
      <div className={classes.precipitation}>
        <FontAwesomeIcon icon={faTint} title={`Probabilidades ${probPrecipitation*100}%`} /> {`${precipitation?.toFixed(2)}mm`}
      </div>
      <div className={classes.wind}>
        <FontAwesomeIcon icon={faWind} /> {`${(wind * 3.6).toFixed()}km/h`}
      </div>
    </div>
  );
}
