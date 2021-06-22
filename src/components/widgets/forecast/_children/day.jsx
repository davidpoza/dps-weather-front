import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind, faTint,
} from '@fortawesome/free-solid-svg-icons';
import { formatWeekDay, getSvgPath } from '../../../helpers/utils';
import useStyles from './useStyles';

export default function DayForecast({
  code, date, maxT, minT, precipitation, wind,
}) {
  const classes = useStyles();
  const dayOfWeek = formatWeekDay(date);

  return (
    <div className={classes.root}>
      <div className={classes.border}>
        <div>
          {dayOfWeek}
        </div>
        <img className={classes.icon} src={getSvgPath(code)} alt={code} />
      </div>
      <div className={classes.minT}>
        {`${minT} °C`}
      </div>
      <div className={classes.maxT}>
        {`${maxT} °C`}
      </div>
      <div className={classes.precipitation}>
        <FontAwesomeIcon icon={faTint} /> {`${precipitation.toFixed(2)}mm`}
      </div>
      <div className={classes.wind}>
        <FontAwesomeIcon icon={faWind} /> {`${(wind * 3.6).toFixed()}km/h`}
      </div>
    </div>
  );
}
