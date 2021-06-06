import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatWeekDay } from '../../../helpers/utils';
import {
  faWind, faTint,
} from '@fortawesome/free-solid-svg-icons';
import useStyles from './useStyles';

export default function DayForecast({ code, date, maxT, minT, precipitation, wind }) {
  const classes = useStyles();
  const dayOfWeek = formatWeekDay(date);
  function getSvgPath(cod) {
    const path = {
      clear: 'clear_day',
      cloudy: 'cloudy',
      drizzle: 'drizzle',
      flurries: 'flurries',
      fog: 'fog',
      fog_light: 'fog_light',
      freezing_rain: 'freezing_rain',
      freezing_rain_drizzle: 'freezing_rain_drizzle',
      freezing_rain_heavy: 'freezing_rain_heavy',
      freezing_rain_light: 'freezing_rain_light',
      ice_pellets: 'ice_pellets',
      ice_pellets_heavy: 'ice_pellets_heavy',
      ice_pellets_light: 'ice_pellets_light',
      most_clear: 'most_clear_day',
      mostly_clear: 'mostly_clear_day',
      mostly_cloudy: 'mostly_cloudy',
      partly_cloudy: 'partly_cloudy_day',
      rain: 'rain',
      rain_heavy: 'rain_heavy',
      rain_light: 'rain_light',
      snow: 'snow',
      snow_heavy: 'snow_heavy',
      snow_light: 'snow_light',
      tstorm: 'tstorm',
    };
    return `svg/forecast/${path[cod]}.svg`;
  }

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
