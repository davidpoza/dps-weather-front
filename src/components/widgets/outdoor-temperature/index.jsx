import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faThermometerQuarter,
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import TrendIcon from '../../trend-icon';
import {
  calculateDewPoint,
  transformDateToLocaleDay,
  calculateTrend,
  filterArrayObjects,
  calculateTHWIndex,
  fromDateTimeToIsoString,
} from '../../helpers/utils';


export default function OutdoorTempertureWidget() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);
  const {
    date, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }

  function Extended() {
    const thw = calculateTHWIndex(outdoorTemp, outdoorHum, wind);
    const dewPoint = calculateDewPoint(outdoorTemp, outdoorHum);
    return (
      <>
        <div className={classes.trend}>
          <div>
            Tendencia
          </div>
          <TrendIcon
            trend={
              calculateTrend(
                outdoorTemp,
                filterArrayObjects(
                  state.graphs?.HOME_OUTDOOR?.[fromDateTimeToIsoString(date)],
                  'temperature',
                ),
              )
            }
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
        <div className={classes.dew}>
          <div>
            Punto de rocío
          </div>
          <div>
            <strong>{ `${dewPoint} °C` }</strong>
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
          { ` Última lectura: ${transformDateToLocaleDay(date)}` }
        </Typography>
      </div>
    </WidgetBase>
  );
}
