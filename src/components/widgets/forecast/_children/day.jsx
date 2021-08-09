import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind, faTint,
} from '@fortawesome/free-solid-svg-icons';
import { getWeatherImage, calculateTempColor } from 'components/helpers/utils';
import useStyles from './useStyles';

export default function DayForecast({
  code, date, maxT, minT, currentT, precipitation = 0, probPrecipitation = 0, wind,
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
      {
        minT && (
        <div className={classes.minT} style={{ color: `${calculateTempColor(minT)}` }}>
          {`${minT} °C`}
        </div>
        )
      }
      {
        minT && (
        <div className={classes.maxT} style={{ color: `${calculateTempColor(maxT)}` }}>
          {`${maxT} °C`}
        </div>
        )
      }
      {
        currentT && (
        <div className={classes.currentT} style={{ color: `${calculateTempColor(currentT)}` }}>
          <div>Ahora</div>
          {`${currentT} °C`}
        </div>
        )
      }
      <div className={classes.precipitation}>
        <FontAwesomeIcon
          icon={faTint}
          title={`Probabilidades ${probPrecipitation * 100}%`}
        />
        {` ${precipitation?.toFixed(2)}mm`}
      </div>
      <div className={classes.wind}>
        <FontAwesomeIcon icon={faWind} />
        {` ${(wind * 3.6).toFixed()}km/h`}
      </div>
    </div>
  );
}

DayForecast.propTypes = {
  code: PropTypes.string,
  date: PropTypes.string,
  maxT: PropTypes.number,
  minT: PropTypes.number,
  currentT: PropTypes.number,
  precipitation: PropTypes.number,
  probPrecipitation: PropTypes.number,
  wind: PropTypes.number,
};
