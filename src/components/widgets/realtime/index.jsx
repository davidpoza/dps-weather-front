import React, { useContext, useState, useEffect } from 'react';
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
import { transformDateToLocaleDay, getSvgPath, calculateTrend, filterArrayObjects, calculateTHWIndex } from '../../helpers/utils';
import api from '../../../api/index';

export default function RealtimeWidget({ location }) {
  const [state, dispatch] = useContext(Store);
  const [realtimeData, setRealtimeData] = useState();
  const {
   wind,
  } = state.currentConditions;
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const res = await api.weather.realtimeClimaCell(location);
      setRealtimeData(await res.json());
    })();
  }, []);

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }
console.log(realtimeData)
  const weatherCode = realtimeData?.data?.weather_code?.value;
  const visibility = realtimeData?.data?.visibility?.value;
  const radiation = realtimeData?.data?.surface_shortwave_radiation?.value;
  const cloudCover = realtimeData?.data?.cloud_cover?.value;
  const windDirection = realtimeData?.data?.wind_direction?.value || 0;

  const Extended = () => {
    return (
      <div>
        <div className={classes.visibility}>
          Visibilidad:
          <br />
          <strong>
            {` ${visibility?.toFixed(2)}Km.`}
          </strong>
        </div>
        <div className={classes.cloudCover}>
          Cobertura de nubes:
          <br />
          <strong>
            {` ${cloudCover?.toFixed(2)}%.`}
          </strong>
        </div>
        <div className={classes.radiation}>
          Radiación solar:
          <br />
          <strong>
            {` ${radiation?.toFixed(2)}W/m².`}
          </strong>
        </div>
      </div>
    );
  };

  return (
    <WidgetBase title="Condiciones en tiempo real" moreInfo="Inspeccionar" extended={<Extended />}>
      <div className={classes.wind}>
        <img
          className={classes.icon}
          src="svg/wind-rose.svg"
          style={{ transform: `rotate(${windDirection}deg)` }}
          alt={weatherCode}
        />
        <div>
          <div>
            {wind}
          </div>
          <div className="units">
            Km/h
          </div>
        </div>
      </div>
      <div className={classes.updated}>
        <Typography variant="caption">
          {
            realtimeData?.ts && (
              <>
                <FontAwesomeIcon icon={faClock} />
                { ` ${transformDateToLocaleDay(realtimeData.ts)}` }
              </>
            )
          }
        </Typography>
      </div>
    </WidgetBase>
  );
}
