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
  transformDateToLocaleDay, calculateTrend, filterArrayObjects, fromDateTimeToIsoString,
} from '../../helpers/utils';


export default function IndoorTempertureWidget() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);
  const {
    date, indoorTemp, indoorHum,
  } = state.currentConditions;

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }

  function Extended() {
    return (
      <>
        <div className={classes.trend}>
          <div>
            Tendencia
          </div>
          <TrendIcon
            trend={
              calculateTrend(
                indoorTemp,
                filterArrayObjects(
                  state.graphs.HOME_INDOOR[fromDateTimeToIsoString(date)],
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
            <strong>{ `${indoorHum} %` }</strong>
          </div>
        </div>
      </>
    );
  }

  return (
    <WidgetBase title="Temperatura interior" extended={<Extended />}>
      <div>
        <FontAwesomeIcon icon={faThermometerQuarter} className={classes.icon} size="2x" />
      </div>
      <div className={classes.value} style={{ color: calculateColor(indoorTemp) }}>
        { `${indoorTemp} °C` }
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
