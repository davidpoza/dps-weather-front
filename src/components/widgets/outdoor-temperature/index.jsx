import React, { useContext } from 'react';
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
import { getLocaleDate, calculateTrend, filterArrayObjects, calculateTHWIndex } from '../../helpers/utils';


export default function OutdoorTempertureWidget() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);
  const {
    date, indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }

  function Extended() {
    const thw = calculateTHWIndex(outdoorTemp, outdoorHum, wind);
    return (
      <>
        <div className={classes.trend}>
          <div>
            Tendencia
          </div>
          <TrendIcon
            trend={calculateTrend(outdoorTemp, filterArrayObjects(state.graph2_points, 'temperature'))}
          />
        </div>
        <div className={classes.humidity}>
          <div>
            Humedad
          </div>
          <div>
            <strong>{ `${outdoorHum} %` }</strong>
          </div>
        </div>
        <div className={classes.feels}>
          <div>
            Se siente
          </div>
          <div>
            <strong>{ `${thw} °C` }</strong>
          </div>
        </div>
      </>
    );
  }

  return (
    <WidgetBase title="Temperatura exterior" extended={<Extended />}>
      <div>
        <FontAwesomeIcon icon={faThermometerQuarter} className={classes.icon} size="2x" />
      </div>
      <div className={classes.value} style={{ color: calculateColor(outdoorTemp) }}>
        { `${outdoorTemp} °C` }
      </div>
      <div>
        <Typography variant="caption">
          <FontAwesomeIcon icon={faClock} />
          { ` Última lectura: ${getLocaleDate(date)}` }
        </Typography>
      </div>
    </WidgetBase>
  );
}
